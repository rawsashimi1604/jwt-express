import db from "../config.js";

function getAllUsers() {
  try {
    const query = `SELECT * FROM "user"`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addUser(user) {
  try {
    const query = `INSERT INTO "user"(username, password) VALUES ($1, $2) RETURNING username`;
    const params = [user.username, user.password];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkUserExists(user) {
  try {
    const query = `SELECT 1
    FROM "user"
    WHERE username = $1`;
    const params = [user.username];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function getHashedUserPassword(user) {
  try {
    const query = `SELECT password FROM "user" WHERE username = $1`;
    const params = [user.username];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllUsers, addUser, checkUserExists, getHashedUserPassword };
