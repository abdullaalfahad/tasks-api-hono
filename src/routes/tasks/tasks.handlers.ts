import type { AppRouteHandler } from "@/lib/types.js";

import db from "@/db/index.ts";

import type { ListRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany();

  return c.json(tasks);
};
