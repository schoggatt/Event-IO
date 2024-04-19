import { RoleSchema } from "./role";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().nullable(),
  email: z.string(),
  image: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  roles: z.array(RoleSchema),
});

export type User = z.infer<typeof UserSchema>;
