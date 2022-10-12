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

    // Password queried from DB
    const hashedPassword = result.rows[0].password;

    if (await bcrypt.compare(user.password, hashedPassword)) {
      res.status(200).send({ username: user.username });
    } else {
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
