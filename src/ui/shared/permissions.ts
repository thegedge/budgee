export function isReadOnly(record: { _owner?: string; _permission?: string }): boolean {
  if (!record._owner) return false;
  return record._permission !== "write" && record._permission !== "admin";
}

export function isShared(record: { _owner?: string }): boolean {
  return !!record._owner;
}
