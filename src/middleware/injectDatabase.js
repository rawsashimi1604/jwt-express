function injectDatabase(req, res, next, database) {
  // Inject database to controllers (Dependency Injection)
  res.locals.database = database;

  // Continue next middleware function or route...
  next();
}

export default injectDatabase;
