import jwt from "jsonwebtoken";

function handleIndex(req, res) {
  res.send("Authentication route...");
}

async function handleAllUsers(req, res) {

}

async function handleAddUser(req, res) {
  const user = { name: req.body.name, password: req.body.password };
  
}

export default {
  handleIndex, handleAllUsers, handleAddUser
};
