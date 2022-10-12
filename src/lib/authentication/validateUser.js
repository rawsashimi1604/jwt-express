export default function validateUser(userObject) {
  // Check if object was passed in...
  if (typeof userObject !== "object") return false;

  // Check if require key value pairs exist
  if (!userObject["username"]) return false;
  if (!userObject["password"]) return false;

  // Check if password length is at least 6 characters long
  if (userObject.password.length < 6) return false;

  // Check was successful.
  return true;
}
