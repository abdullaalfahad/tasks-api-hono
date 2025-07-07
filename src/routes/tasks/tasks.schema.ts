// src/db/zod.ts
import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskListSchema = z.array(taskSchema);
export const taskCreateSchema = taskSchema.required({
  done: true,
}).omit({ id: true, createdAt: true, updatedAt: true });
