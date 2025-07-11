import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { honoPinoLogger } from "@/middlewares/hono-pino-logger.js";

import type { AppBindings } from "./types.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("✍️"));
  app.use(honoPinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
