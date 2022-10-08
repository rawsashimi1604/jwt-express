import jwt from "jsonwebtoken";

function handleIndex(req, res) {
  res.send("Authentication route...");
}

async function handleAllUsers(req, res) {
  const database = res.locals.database;
  const users = await database.relations.user.getAllUsers();
  res.status(200).send(users.rows);
}

async function handleAddUser(req, res) {
  const user = { name: req.body.name, password: req.body.password };
  const database = res.locals.database;
  const userAdded = await database.relations.user.addUser();
  
}

export default {
  handleIndex,
  handleAllUsers,
  handleAddUser,
};
