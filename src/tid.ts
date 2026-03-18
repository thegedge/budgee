// ATProto TID spec: https://atproto.com/specs/tid
// - 64-bit integer encoded as 13-char base32-sortable string
// - Top 53 bits: microsecond timestamp
// - Bottom 10 bits: random clock ID (generated once per session)
// - Charset: "234567abcdefghijklmnopqrstuvwxyz"
// - Must be monotonically increasing

const S32_CHAR = "234567abcdefghijklmnopqrstuvwxyz";

let lastTimestamp = 0;
const clockId = Math.floor(Math.random() * 1024); // 10-bit random clock ID

export function tid(): string {
  let timestamp = Date.now() * 1000; // milliseconds → microseconds
  if (timestamp <= lastTimestamp) {
    timestamp = lastTimestamp + 1;
  }
  lastTimestamp = timestamp;

  const id = (BigInt(timestamp) << 10n) | BigInt(clockId);

  let encoded = "";
  let remaining = id;
  for (let i = 0; i < 13; i++) {
    encoded = S32_CHAR[Number(remaining & 31n)] + encoded;
    remaining >>= 5n;
  }

  return encoded;
}
