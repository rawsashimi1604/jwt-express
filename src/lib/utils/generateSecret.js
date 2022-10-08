import crypto from "crypto";

// Utility script to generate server side secret token.

export default function generateSecret() {
  return crypto.randomBytes(64).toString("hex");
}

// const secret = generateSecret();
// console.log(secret);
