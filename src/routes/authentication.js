import express from "express";

import AuthenticationController from "../controller/authentication.js";
import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into Auth Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", AuthenticationController.handleIndex);
  router.post(
    "/login",
    asyncErrorHandler(AuthenticationController.handleUserLogin)
  );

  return router;
}
