import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { taskCreateSchema, taskListSchema, taskSchema } from "./tasks.schema.ts";

export const list = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      (taskListSchema),
      "Get tasks list",
    ),
  },
});

export const createOne = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  request: {
    body: jsonContentRequired(taskCreateSchema, "Create task"),
  },
  method: "post",
  responses: {
    200: jsonContent(
      taskSchema,
      "Create task",
    ),
  },
});

export const getOne = createRoute({
  tags: ["Tasks"],
  path: "/tasks/:id",
  request: {
    params: z.object({ id: z.string() }),
  },
  method: "get",
  responses: {
    200: jsonContent(
      taskSchema,
      "Get task",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof createOne;
export type GetOne = typeof getOne;
