import express from "express";

import AuthenticationController from "../controller/authentication.js";
import asyncErrorHandler from "../lib/utils/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Middleware that is specific to Auth Router..
  router.use((req, res, next) => {
    // Inject database to controllers (Dependency Injection)
    res.locals.database = database;

    // Continue next middleware function or route...
    next();
  });

  // Routes
  router.get("/", AuthenticationController.handleIndex);
  router.post(
    "/login",
    asyncErrorHandler(AuthenticationController.handleUserLogin)
  );

  return router;
}
