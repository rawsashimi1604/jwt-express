import express from "express";

import UserController from "../controller/user.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Middleware that is specific to User Router..
  router.use((req, res, next) => {
    // Inject database to controllers (Dependency Injection)
    res.locals.database = database;

    // Continue next middleware function or route...
    next();
  });

  // Routes
  router.get("/", UserController.handleIndex);
  router.post("/", asyncErrorHandler(UserController.handleAddUser));
  router.get("/all", asyncErrorHandler(UserController.handleAllUsers));

  return router;
}
