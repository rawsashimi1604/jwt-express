import bcrypt from "bcrypt";

// Hash password
export default async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
