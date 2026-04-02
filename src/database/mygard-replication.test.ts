import { describe, expect, it } from "vitest";

/**
 * Replicate the checkpoint advancement logic from the pull handler.
 * When shared documents are present but own seq doesn't change,
 * the `v` counter must increment so RxDB sees checkpoint progress.
 */
function advanceCheckpoint(
  ownResult: { seq: number },
  prevCheckpoint: { seq: number; epoch?: string; v?: number },
  documents: { _owner?: string }[],
  epoch: string,
): { seq: number; epoch: string; v: number } {
  const hasSharedDocs = documents.some((d) => d._owner);
  const prevV = prevCheckpoint.v ?? 0;
  return {
    ...ownResult,
    epoch,
    v: hasSharedDocs ? prevV + 1 : prevV,
  };
}

describe("shared pull checkpoint advancement", () => {
  it("increments v when shared documents are present", () => {
    const cp = advanceCheckpoint(
      { seq: 0 },
      { seq: 0, epoch: "e1", v: 0 },
      [{ _owner: "did:web:example:users:alice" }],
      "e1",
    );
    expect(cp.v).toBe(1);
    expect(cp.seq).toBe(0);
  });

  it("does not increment v when only own documents are present", () => {
    const cp = advanceCheckpoint(
      { seq: 5 },
      { seq: 3, epoch: "e1", v: 2 },
      [{ _owner: undefined }],
      "e1",
    );
    expect(cp.v).toBe(2);
    expect(cp.seq).toBe(5);
  });

  it("increments v from undefined when first shared docs arrive", () => {
    const cp = advanceCheckpoint(
      { seq: 0 },
      { seq: 0, epoch: "e1" },
      [{ _owner: "did:web:example:users:alice" }],
      "e1",
    );
    expect(cp.v).toBe(1);
  });

  it("keeps v at 0 when no documents are returned", () => {
    const cp = advanceCheckpoint({ seq: 5 }, { seq: 5, epoch: "e1", v: 0 }, [], "e1");
    expect(cp.v).toBe(0);
  });

  it("increments v on each pull with shared docs", () => {
    const cp1 = advanceCheckpoint(
      { seq: 0 },
      { seq: 0, epoch: "e1", v: 0 },
      [{ _owner: "alice" }],
      "e1",
    );
    expect(cp1.v).toBe(1);

    const cp2 = advanceCheckpoint({ seq: 0 }, cp1, [{ _owner: "alice" }], "e1");
    expect(cp2.v).toBe(2);
  });
});
