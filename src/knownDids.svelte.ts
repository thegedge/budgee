let dids = $state<string[]>([]);

export function knownDids(): string[] {
  return dids;
}

export function setKnownDids(value: string[]): void {
  dids = value;
}
