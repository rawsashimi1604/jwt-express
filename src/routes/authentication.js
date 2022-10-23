import express from "express";

import AuthenticationController from "../controller/authentication.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";
import injectDatabase from "../middleware/injectDatabase.js";

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
  router.post(
    "/token",
    asyncErrorHandler(AuthenticationController.handleNewToken)
  );

  return router;
}
