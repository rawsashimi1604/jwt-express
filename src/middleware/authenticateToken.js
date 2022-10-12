import jwt from "jsonwebtoken";

// Get token from client, verify that the correct user was logged in
export default function authenticateToken(req, res, next) {
  // First, we check if a token was specified in the Http request (using Http headers and checking the authorization field)
  // Http HEADER format => 'Bearer TOKEN', get TOKEN
  const authHeader = req.headers["authorization"];

  // Return undefined or token
  const token = authHeader && authHeader.split(" ")[1];

  // If no token... no access
  if (token == null) return res.status(400);

  // Now we know that the client has sent a token...
  // Verify that the JWT token is valid against our server SECRET token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, serializedObject) => {
      // If err, you do not have access
      if (err) return res.status(400);

      // Else, you have a valid token, pass the decrypted user object to the next function...
      req.user = serializedObject;
      next();
    }
  );
}
