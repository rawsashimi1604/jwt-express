import jwt from "jsonwebtoken";

// Get token from client, verify that the correct user was logged in
export function authenticateToken(req, res, next) {
  console.log("Authenticating!!");

  // First, we check if a token was specified in the Http request (using Http headers and checking the authorization field)
  // Http HEADER format => 'Bearer TOKEN', get TOKEN
  const authHeader = req.headers["authorization"];

  console.log(authHeader);

  // Return undefined or token
  const token = authHeader && authHeader.split(" ")[1];

  // If no token... no access
  if (token == null) return res.sendStatus(400);

  console.log("After verifying no token...");

  // Now we know that the client has sent a token...
  // Verify that the JWT token is valid against our server SECRET token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, serializedObject) => {
      console.log("inside JWT");

      console.log(err);
      // If err, you do not have access
      if (err) return res.sendStatus(400);

      console.log("validate Error");
      // Else, you have a valid token, pass the decrypted user object to the next function...
      req.user = serializedObject;

      console.log("After decrypting user object");
      console.log(serializedObject);
      next();
    }
  );
}
