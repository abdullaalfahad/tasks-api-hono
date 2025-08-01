import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { notFoundSchema } from "@/lib/constant.ts";

import { taskCreateSchema, taskListSchema, taskSchema } from "./tasks.schema.ts";

export const list = createRoute({
  tags: ["Tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
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
    [HttpStatusCodes.OK]: jsonContent(
      taskSchema,
      "Create task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(taskCreateSchema), "The validation error(s)"),
  },
});

export const getOne = createRoute({
  tags: ["Tasks"],
  path: "/tasks/:id",
  request: {
    params: IdParamsSchema,
  },
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      taskSchema,
      "Get task",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema), "Invalid id error"),
  },
});

export const patchOne = createRoute({
  tags: ["Tasks"],
  path: "/tasks/:id",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(taskCreateSchema, "Update task"),
  },
  method: "patch",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      taskSchema,
      "Update task",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdParamsSchema).or(createErrorSchema(taskCreateSchema)), "The validation error(s)"),
  },
});

export const removeOne = createRoute({
  tags: ["Tasks"],
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },

  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof createOne;
export type GetOneRoute = typeof getOne;
export type PatchrRoute = typeof patchOne;
export type RemoveRoute = typeof removeOne;
