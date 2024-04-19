import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
