import makeApp from "./app.js";
import setupEnv from "./lib/utils/setupEnv.js";
import databases from "../db/index.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

// Create PostgreSQL database object (current database object in use)
const database = databases.PSQLDatabase;

// Inject database into express.js app... (Dependency Injection)
const app = makeApp(database);

// Decide which port is in use... (production = process.env.PORT, local = 3000)
const PORT = process.env.PORT || process.env.BACKEND_PORT;

app.listen(PORT, (e) => {
  if (e) {
    console.log("Error occured, cannot start server...", e);
  } else {
    console.log("Server has successfully started on port: " + PORT);
  }
});
