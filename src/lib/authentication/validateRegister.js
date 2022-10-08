export default function validateRegister(userObject) {
  
  // Check if object was passed in...
  if (typeof(userObject) !== 'object') return false;

  // Check if require key value pairs exist
  if (!("username" in userObject)) return false;
  if (!("password" in userObject)) return false;

  // Check if password length is at least 6 characters long
  if (userObject.password.length < 6) return false;

  // Check was successful.
  return true;
}