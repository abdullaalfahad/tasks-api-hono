import type { MiddlewareHandler } from "hono";

import { pinoLogger } from "hono-pino";
import pino from "pino";

import env from "../../env.js";

export function honoPinoLogger(): MiddlewareHandler {
  const isProd = env.NODE_ENV === "production";

  const logger = isProd
    ? pino.default({ level: env.LOG_LEVEL || "info" })
    : pino.default({
        level: env.LOG_LEVEL || "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      });

  return pinoLogger({ pino: logger });
}
