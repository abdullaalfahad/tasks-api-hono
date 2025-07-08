import * as HTTPStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types.js";

import db from "@/db/index.ts";
import { tasksTable } from "@/db/schema.ts";

import type { CreateRoute, GetOne, ListRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany();

  return c.json(tasks);
};

export const createOne: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");

  const createdTask = await db.insert(tasksTable).values(task).returning();

  return c.json(createdTask[0], 200);
};

export const getOne: AppRouteHandler<GetOne> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.query.tasksTable.findFirst({ where(fields, operators) {
    return operators.eq(fields.id, Number(id));
  } });

  if (!task) {
    return c.json({ message: "task not found" }, HTTPStatusCodes.NOT_FOUND);
  }

  return c.json(task, HTTPStatusCodes.OK);
};
