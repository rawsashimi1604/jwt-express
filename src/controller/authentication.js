import jwt from "jsonwebtoken";
import validateUser from "../lib/authentication/validateUser.js";
import generateAccessToken from "../lib/authentication/generateAccessToken.js";
import bcrypt from "bcrypt";

function handleIndex(req, res) {
  res.send("Authentication route...");
}

async function handleUserLogin(req, res) {
  const user = {
    username: req.body["username"],
    password: req.body["password"],
  };

  // User object was validated! Correct info was passed..
  if (validateUser(user)) {
    const database = res.locals.database;
    const result = await database.relations.user.getHashedUserPassword(user);

    // If user does not exist return 400
    const checkUserExists = await database.relations.user.checkUserExists(user);
    console.log(checkUserExists);
    if (checkUserExists.rows.length === 0)
      return res.status(400).send("Invalid username.");

    // Password queried from DB
    const hashedPassword = result.rows[0].password;

    if (await bcrypt.compare(user.password, hashedPassword)) {
      // Password was correct!
      // Create JSON Web token, serialize user object
      const serializedObject = { username: user.username };

      // Generate access token
      const accessToken = generateAccessToken(serializedObject);

      // Generate refresh token as it expries in x seconds
      const refreshToken = jwt.sign(
        serializedObject,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Return access token to logged in user.
      res
        .status(200)
        .send({ accessToken: accessToken, refreshToken: refreshToken });
    }

    // Incorrect password...
    else {
      res.status(400).send("Invalid password.");
    }
  }

  // Invalid object passed
  else {
    res.status(400).send("Invalid user object sent.");
  }
}

// async function handleNewToken(req, res) {
//   const refreshToken = req.body.token;

// }

export default {
  handleIndex,
  handleUserLogin,
};
