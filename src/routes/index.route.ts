import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app.js";

const router = createRouter()
  .openapi(createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema(), "task index api"),
    },
  }), (c) => {
    return c.json({
      message: "Tasks API",
    }, 200);
  });

export default router;
