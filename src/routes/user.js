import express from "express";

import UserController from "../controller/user.js";
import injectDatabase from "../middleware/injectDatabase.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Inject Database passed from app into user Route...
  router.use((req, res, next) => injectDatabase(req, res, next, database));

  // Routes
  router.get("/", UserController.handleIndex);
  router.post("/", asyncErrorHandler(UserController.handleAddUser));
  router.get("/all", asyncErrorHandler(UserController.handleAllUsers));

  return router;
}
