import jwt from "jsonwebtoken";

function handleIndex(req, res) {
  res.send("Authentication route...");
}

export default {
  handleIndex,
};
