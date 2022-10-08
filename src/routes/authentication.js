import express from "express";

import AuthenticationController from "../controller/authentication";
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
  router.get("/", AuthenticationController.handleIndex);

  return router;
}
