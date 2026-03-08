import { randomBytes, createHash } from "crypto";

export function generateKey() {
  const plainKey = `ps_${randomBytes(24).toString("hex")}`;
  const hashedKey = createHash("sha256").update(plainKey).digest("hex");
  return { plainKey, hashedKey };
}
