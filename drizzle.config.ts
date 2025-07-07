import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./env.ts";

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
