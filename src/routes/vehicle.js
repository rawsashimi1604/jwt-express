import express from "express";

import VehicleController from "../controller/vehicle.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Middleware that is specific to Vehicle Router..
  router.use((req, res, next) => {
    // Inject database to controllers (Dependency Injection)
    res.locals.database = database;

    // Continue next middleware function or route...
    next();
  });

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
