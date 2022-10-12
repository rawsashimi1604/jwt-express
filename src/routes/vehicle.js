import express from "express";

import VehicleController from "../controller/vehicle.js";
import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into Vehicle Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", VehicleController.handleIndex);
  router.get("/all", asyncErrorHandler(VehicleController.handleAllVehicles));
  router.post("/", asyncErrorHandler(VehicleController.handleAddVehicle));
  router.delete(
    "/:id",
    asyncErrorHandler(VehicleController.handleDeleteVehicle)
  );

  return router;
}
