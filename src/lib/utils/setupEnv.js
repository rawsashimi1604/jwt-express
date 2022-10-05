import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

export default function setupEnv(envPath) {
  // Use .env file..
  // Hardcoded to be only usable by files that are one directory up for now...

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../" + envPath) });
}
