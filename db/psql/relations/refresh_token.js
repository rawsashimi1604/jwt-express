import db from "../config.js";

function getAllRefreshTokens() {
  try {
    const query = `SELECT * FROM "refresh_token`;
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addToken(token) {
  try {
    const query = `INSERT INTO "refresh_token"(token) VALUES ($1)`;
    const params = [token];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function deleteToken(token) {
  try {
    const query = `DELETE FROM "refresh_token" WHERE token=$1`;
    const params = [token];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function checkTokenExists(token) {
  try {
    const query = `SELECT 1
    FROM "refresh_token"
    WHERE token = $1`;
    const params = [token];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  getAllRefreshTokens,
  addToken,
  deleteToken,
  checkTokenExists,
};
