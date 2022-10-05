import validateAddVehicle from "../lib/vehicle/validateAddVehicle.js";
import validateDeleteVehicle from "../lib/vehicle/validateDeleteVehicle.js";

function handleIndex(req, res) {
  res.send("Vehicle route...");
}

async function handleAllVehicles(req, res) {
  // Database object passed from middleware...
  const database = res.locals.database;
  const vehicles = await database.relations.vehicle.getAllVehicles();
  res.status(200).send(vehicles.rows);
}

async function handleAddVehicle(req, res) {
  const vehicle = req.body;

  // If invalid json object, send 400 error...
  if (!validateAddVehicle(vehicle)) {
    res.status(400).send("Invaild vehicle object sent.");
  } else {
    const database = res.locals.database;
    const addedVehicle = await database.relations.vehicle.addVehicle(vehicle);
    res.status(200).send(addedVehicle.rows[0]);
  }
}

async function handleDeleteVehicle(req, res) {
  const { id } = req.params;

  // If invalid json object, send 400 error...
  if (!validateDeleteVehicle(Number(id))) {
    res.status(400).send("Invaild id object sent.");
  } else {
    const database = res.locals.database;
    const deleteVehicle = await database.relations.vehicle.deleteVehicleByID(
      id
    );

    // Vehicle was deleted , success..
    if (deleteVehicle.rowCount > 0) {
      res.status(200).send(deleteVehicle.rows[0]);
    }

    // Vehicle was not deleted, failure...
    else {
      res.status(204).send("Delete failed, id does not exist.");
    }
  }
}

export default {
  handleIndex,
  handleAllVehicles,
  handleAddVehicle,
  handleDeleteVehicle,
};
