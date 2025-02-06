import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(5).max(20, "Title cannot have more than 20 characters"),
  description: z
    .string()
    .min(0)
    .max(20, "Description cannot have more than 20 characters"),
  priority: z.string(),
  status: z.string(),
});
