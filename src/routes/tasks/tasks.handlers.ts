import { eq } from "drizzle-orm";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types.js";

import db from "@/db/index.ts";
import { tasksTable } from "@/db/schema.ts";

import type { CreateRoute, GetOneRoute, ListRoute, PatchrRoute, RemoveRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany();

  return c.json(tasks);
};

export const createOne: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");

  const createdTask = await db.insert(tasksTable).values(task).returning();

  return c.json(createdTask[0], 200);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.query.tasksTable.findFirst({ where(fields, operators) {
    return operators.eq(fields.id, Number(id));
  } });

  if (!task) {
    return c.json({ message: "task not found" }, HTTPStatusCodes.NOT_FOUND);
  }

  return c.json(task, HTTPStatusCodes.OK);
};

export const patchOne: AppRouteHandler<PatchrRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const taskUpdate = c.req.valid("json");

  const updatedTask = await db
    .update(tasksTable)
    .set(taskUpdate)
    .where(eq(tasksTable.id, id))
    .returning();

  if (updatedTask.length === 0) {
    return c.json({ message: "task not found" }, HTTPStatusCodes.NOT_FOUND);
  }

  return c.json(updatedTask[0], HTTPStatusCodes.OK);
};

export const removeOne: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(tasksTable)
    .where(eq(tasksTable.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HTTPStatusCodes.NOT_FOUND,
    );
  }

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
