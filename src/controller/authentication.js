import jwt from "jsonwebtoken";
import validateUser from "../lib/authentication/validateUser.js";
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
      const accessToken = jwt.sign(
        serializedObject,
        process.env.ACCESS_TOKEN_SECRET
      );

      // Return access token to logged in user.
      res.status(200).send({ accessToken: accessToken });
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

export default {
  handleIndex,
  handleUserLogin,
};
