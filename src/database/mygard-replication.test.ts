import { describe, expect, it } from "vitest";

// ---------------------------------------------------------------------------
// Helpers that mirror the logic in mygard-replication.ts so we can unit-test
// the transformations without standing up a full WebSocket + RxDB stack.
// ---------------------------------------------------------------------------

interface ServerDoc {
  id: string;
  collection: string;
  _rev?: string;
  _owner?: string;
  _permission?: string;
  _deleted?: boolean;
  [key: string]: unknown;
}

/** Strip server fields before handing docs to RxDB (pull & stream paths). */
function stripServerDoc(d: ServerDoc): Record<string, unknown> {
  const { collection: _, _rev: __, ...rest } = d;
  if (rest._owner) {
    rest.id = `${rest._owner}~${rest.id}`;
  }
  return rest;
}

/** Checkpoint advancement logic from the pull handler. */
function advanceCheckpoint(
  ownResult: { seq: number },
  prevCheckpoint: { seq: number; v?: number },
  documents: { _owner?: string }[],
): { seq: number; v: number } {
  const hasSharedDocs = documents.some((d) => d._owner);
  const prevV = prevCheckpoint.v ?? 0;
  return {
    ...ownResult,
    v: hasSharedDocs ? prevV + 1 : prevV,
  };
}

interface OwnerCheckpoint {
  seq: number;
  v?: number;
}

/** Stream checkpoint logic: use last pull checkpoint for shared docs. */
function streamCheckpoint(
  ownCheckpoint: OwnerCheckpoint,
  lastPullCheckpoint: OwnerCheckpoint | undefined,
  hasSharedDocs: boolean,
): OwnerCheckpoint {
  const base = hasSharedDocs ? (lastPullCheckpoint ?? { seq: 0 }) : ownCheckpoint;
  return hasSharedDocs ? { ...base, v: (base.v ?? 0) + 1 } : ownCheckpoint;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("_rev stripping from server documents", () => {
  it("removes _rev from own documents", () => {
    const doc: ServerDoc = {
      id: "tx1",
      collection: "io.mygard.finance.transaction",
      _rev: "bafyabc",
      _deleted: false,
      date: "2025-01-01",
      amount: -42,
    };
    const result = stripServerDoc(doc);
    expect(result).not.toHaveProperty("_rev");
    expect(result).not.toHaveProperty("collection");
    expect(result.id).toBe("tx1");
    expect(result.date).toBe("2025-01-01");
  });

  it("removes _rev from shared documents and prefixes id", () => {
    const doc: ServerDoc = {
      id: "tx1",
      collection: "io.mygard.finance.transaction",
      _rev: "",
      _owner: "did:web:alice",
      _permission: "read",
      _deleted: false,
      amount: -10,
    };
    const result = stripServerDoc(doc);
    expect(result).not.toHaveProperty("_rev");
    expect(result.id).toBe("did:web:alice~tx1");
    expect(result._owner).toBe("did:web:alice");
  });

  it("removes _rev even when it is an empty string", () => {
    const doc: ServerDoc = {
      id: "tx1",
      collection: "col",
      _rev: "",
      _owner: "did:web:alice",
    };
    const result = stripServerDoc(doc);
    expect(result).not.toHaveProperty("_rev");
  });

  it("works when _rev is undefined", () => {
    const doc: ServerDoc = { id: "tx1", collection: "col" };
    const result = stripServerDoc(doc);
    expect(result).not.toHaveProperty("_rev");
    expect(result).not.toHaveProperty("collection");
    expect(result.id).toBe("tx1");
  });
});

describe("stream checkpoint for shared docs", () => {
  it("uses last pull checkpoint instead of server checkpoint for shared docs", () => {
    const serverOwnerCheckpoint: OwnerCheckpoint = { seq: 999 }; // Alice's seq
    const lastPull: OwnerCheckpoint = { seq: 10, v: 3 };

    const cp = streamCheckpoint(serverOwnerCheckpoint, lastPull, true);

    // Must use our own seq (10), not Alice's (999)
    expect(cp.seq).toBe(10);
    expect(cp.v).toBe(4);
  });

  it("falls back to seq 0 when no prior pull checkpoint exists", () => {
    const serverOwnerCheckpoint: OwnerCheckpoint = { seq: 42 };

    const cp = streamCheckpoint(serverOwnerCheckpoint, undefined, true);

    expect(cp.seq).toBe(0);
    expect(cp.v).toBe(1);
  });

  it("uses server checkpoint directly for own doc events", () => {
    const serverCheckpoint: OwnerCheckpoint = { seq: 15 };
    const lastPull: OwnerCheckpoint = { seq: 10, v: 3 };

    const cp = streamCheckpoint(serverCheckpoint, lastPull, false);

    expect(cp.seq).toBe(15);
    expect(cp).toBe(serverCheckpoint); // exact same object, no transformation
  });
});

describe("shared pull checkpoint advancement", () => {
  it("increments v when shared documents are present", () => {
    const cp = advanceCheckpoint({ seq: 0 }, { seq: 0, v: 0 }, [
      { _owner: "did:web:example:users:alice" },
    ]);
    expect(cp.v).toBe(1);
    expect(cp.seq).toBe(0);
  });

  it("does not increment v when only own documents are present", () => {
    const cp = advanceCheckpoint({ seq: 5 }, { seq: 3, v: 2 }, [{ _owner: undefined }]);
    expect(cp.v).toBe(2);
    expect(cp.seq).toBe(5);
  });

  it("increments v from undefined when first shared docs arrive", () => {
    const cp = advanceCheckpoint({ seq: 0 }, { seq: 0 }, [
      { _owner: "did:web:example:users:alice" },
    ]);
    expect(cp.v).toBe(1);
  });

  it("keeps v at 0 when no documents are returned", () => {
    const cp = advanceCheckpoint({ seq: 5 }, { seq: 5, v: 0 }, []);
    expect(cp.v).toBe(0);
  });

  it("increments v on each pull with shared docs", () => {
    const cp1 = advanceCheckpoint({ seq: 0 }, { seq: 0, v: 0 }, [{ _owner: "alice" }]);
    expect(cp1.v).toBe(1);

    const cp2 = advanceCheckpoint({ seq: 0 }, cp1, [{ _owner: "alice" }]);
    expect(cp2.v).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// effectivePermission — mirrors the closure in startMygardReplication
// ---------------------------------------------------------------------------

function effectivePermission(
  remainingGrants: { object: string; permission: string }[],
  nsid: string,
  ownerDid: string,
  rkey: string,
): string | null {
  const RANK: Record<string, number> = { read: 0, write: 1, admin: 2 };
  let best: string | null = null;
  const recordUri = `at://${ownerDid}/${nsid}/${rkey}`;
  for (const g of remainingGrants) {
    if (g.object !== nsid && g.object !== recordUri) continue;
    if (!best || (RANK[g.permission] ?? 0) > (RANK[best] ?? 0)) best = g.permission;
  }
  return best;
}

describe("effectivePermission", () => {
  const nsid = "io.mygard.finance.transaction";
  const owner = "did:web:alice";
  const rkey = "tx1";

  it("returns null when no remaining grants", () => {
    expect(effectivePermission([], nsid, owner, rkey)).toBeNull();
  });

  it("returns null when grants don't match nsid or record URI", () => {
    const grants = [{ object: "io.mygard.finance.tag", permission: "read" }];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBeNull();
  });

  it("matches collection-wide grant by nsid", () => {
    const grants = [{ object: nsid, permission: "read" }];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("read");
  });

  it("matches record-specific grant by URI", () => {
    const uri = `at://${owner}/${nsid}/${rkey}`;
    const grants = [{ object: uri, permission: "write" }];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("write");
  });

  it("picks highest permission from multiple grants", () => {
    const grants = [
      { object: nsid, permission: "read" },
      { object: nsid, permission: "admin" },
      { object: nsid, permission: "write" },
    ];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("admin");
  });

  it("picks highest between collection and record grants", () => {
    const uri = `at://${owner}/${nsid}/${rkey}`;
    const grants = [
      { object: nsid, permission: "read" },
      { object: uri, permission: "write" },
    ];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("write");
  });

  it("handles unknown permission values gracefully", () => {
    const grants = [
      { object: nsid, permission: "unknown" },
      { object: nsid, permission: "read" },
    ];
    // "unknown" has rank 0 (via ??), "read" also rank 0 — first seen wins
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("unknown");
  });

  it("known permission beats unknown", () => {
    const grants = [
      { object: nsid, permission: "unknown" },
      { object: nsid, permission: "write" },
    ];
    expect(effectivePermission(grants, nsid, owner, rkey)).toBe("write");
  });
});

// ---------------------------------------------------------------------------
// onMessage stream filtering — mirrors the NSID filtering logic
// ---------------------------------------------------------------------------

function filterStreamDocs(
  documents: { collection: string; _owner?: string; id: string; _rev?: string }[],
  nsid: string,
): Record<string, unknown>[] {
  return documents
    .filter((d) => d.collection === nsid)
    .map((d) => {
      const { collection: _, _rev: __, ...rest } = d;
      if (rest._owner) {
        rest.id = `${rest._owner}~${rest.id}`;
      }
      return rest;
    });
}

describe("stream NSID filtering", () => {
  it("filters documents by collection NSID", () => {
    const docs = [
      { id: "1", collection: "io.mygard.finance.transaction", amount: -10 },
      { id: "2", collection: "io.mygard.finance.tag", name: "food" },
      { id: "3", collection: "io.mygard.finance.transaction", amount: -20 },
    ];
    const filtered = filterStreamDocs(docs, "io.mygard.finance.transaction");
    expect(filtered).toHaveLength(2);
    expect(filtered[0].id).toBe("1");
    expect(filtered[1].id).toBe("3");
  });

  it("returns empty array when no docs match", () => {
    const docs = [{ id: "1", collection: "io.mygard.finance.tag", name: "food" }];
    const filtered = filterStreamDocs(docs, "io.mygard.finance.transaction");
    expect(filtered).toHaveLength(0);
  });

  it("strips collection and _rev from filtered docs", () => {
    const docs = [
      { id: "1", collection: "io.mygard.finance.transaction", _rev: "abc", amount: -10 },
    ];
    const filtered = filterStreamDocs(docs, "io.mygard.finance.transaction");
    expect(filtered[0]).not.toHaveProperty("collection");
    expect(filtered[0]).not.toHaveProperty("_rev");
    expect(filtered[0].amount).toBe(-10);
  });

  it("prefixes shared doc ids with owner", () => {
    const docs = [
      {
        id: "tx1",
        collection: "io.mygard.finance.transaction",
        _owner: "did:web:alice",
        _permission: "read",
      },
    ];
    const filtered = filterStreamDocs(docs, "io.mygard.finance.transaction");
    expect(filtered[0].id).toBe("did:web:alice~tx1");
  });
});

// ---------------------------------------------------------------------------
// Push handler filtering — shared docs should not be pushed
// ---------------------------------------------------------------------------

describe("push handler shared doc filtering", () => {
  function filterPushDocs(
    docs: { newDocumentState: Record<string, unknown> }[],
  ): Record<string, unknown>[] {
    return docs
      .filter((d) => !d.newDocumentState._owner)
      .map((d) => ({ ...d.newDocumentState, collection: "nsid" }));
  }

  it("includes own documents", () => {
    const docs = [{ newDocumentState: { id: "1", amount: -10 } }];
    expect(filterPushDocs(docs)).toHaveLength(1);
  });

  it("excludes shared documents", () => {
    const docs = [
      { newDocumentState: { id: "1", amount: -10 } },
      { newDocumentState: { id: "did:web:alice~2", _owner: "did:web:alice", amount: -20 } },
    ];
    expect(filterPushDocs(docs)).toHaveLength(1);
    expect(filterPushDocs(docs)[0].id).toBe("1");
  });

  it("returns empty when all docs are shared", () => {
    const docs = [{ newDocumentState: { id: "1", _owner: "did:web:alice" } }];
    expect(filterPushDocs(docs)).toHaveLength(0);
  });
});
