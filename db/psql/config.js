import pg from "pg";
import setupEnv from "../../src/lib/utils/setupEnv.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

const devConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  max: 20,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // Heroku addons
  ssl: {
    rejectUnauthorized: false,
  },
};

export default new pg.Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);
