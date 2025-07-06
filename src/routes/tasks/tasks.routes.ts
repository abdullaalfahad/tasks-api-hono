import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

export const list = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(z.array(z.object({
      name: z.string(),
      done: z.boolean().default(false),
    })), "Tasks list"),
  },
});

export type ListRoute = typeof list;
