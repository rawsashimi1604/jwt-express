import express from "express";

import VehicleController from "../controller/vehicle.js";
import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into Vehicle Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Authenticate user before they are able to get vehicle data...
  router.use(authenticateToken);

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
