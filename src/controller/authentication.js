import jwt from "jsonwebtoken";
import validateRegister from "../lib/authentication/validateRegister.js";
import hashPassword from "../lib/authentication/hashPassword.js";

function handleIndex(req, res) {
  res.send("Authentication route...");
}

async function handleAllUsers(req, res) {
  const database = res.locals.database;
  const users = await database.relations.user.getAllUsers();
  res.status(200).send(users.rows);
}

async function handleAddUser(req, res) {
  const user = {
    username: req.body["username"],
    password: req.body["password"],
  };

  // User object validated! Correct information passed
  if (validateRegister(user)) {
    // Hash user password before storing in database
    user.password = await hashPassword(user.password);

    const database = res.locals.database;
    const userAdded = await database.relations.user.addUser(user);

    // User was registered , success..
    res.status(200).send(userAdded.rows[0]);
  }

  // Invalid object passed
  else {
    res.status(400).send("Invalid user object sent.");
  }
}

export default {
  handleIndex,
  handleAllUsers,
  handleAddUser,
};
