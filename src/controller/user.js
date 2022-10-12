import validateUser from "../lib/authentication/validateUser.js";
import bcrypt from "bcrypt";

function handleIndex(req, res) {
  res.send("User route...");
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
  if (validateUser(user)) {
    const database = res.locals.database;

    // Hash password using bcrypt before storing in database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const checkUserExists = await database.relations.user.checkUserExists(user);

    // If user already exists in database, cannot register.
    if (checkUserExists.rows.length > 0) {
      res.status(400).send("Failed to register.");
    }

    // Else, register should be successful.
    else {
      const userAdded = await database.relations.user.addUser(user);

      // User was registered , success..
      res.status(200).send(userAdded.rows[0]);
    }
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
