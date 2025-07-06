import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import z from "zod";

expand(config());

const envSchema = z.object({
  PORT: z.coerce.number().default(9999),
  NODE_ENV: z.string().default("production"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
});

export type env = z.infer<typeof envSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

try {
  env = envSchema.parse(process.env);
}
catch (e) {
  const error = e as ZodError;
  console.warn("❌ invalid env");
  console.warn(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
