import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "../../env.js";
import * as schema from "./schema.ts";

const client = createClient({ url: env.DB_FILE_NAME });
const db = drizzle({ client, schema });

export default db;
