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
