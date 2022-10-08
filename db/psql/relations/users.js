import db from "../config.js";

function getAllUsers() {
  try {
    const query = "SELECT * FROM user";
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addUser(user) {
  try {
    const query = "INSERT INTO user(username, password) VALUES ($1) RETURNING *";
    const params = [user.username, user.password];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}