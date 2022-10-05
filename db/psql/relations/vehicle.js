import db from "../config.js";

function getAllVehicles() {
  try {
    const query = "SELECT * FROM vehicle";
    return db.query(query);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function addVehicle(vehicle) {
  try {
    const query = "INSERT INTO vehicle(name) VALUES ($1) RETURNING *";
    const params = [vehicle.name];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function deleteVehicleByID(id) {
  try {
    const query = "DELETE FROM vehicle WHERE id = $1 RETURNING *";
    const params = [id];
    return db.query(query, params);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getAllVehicles, addVehicle, deleteVehicleByID };
