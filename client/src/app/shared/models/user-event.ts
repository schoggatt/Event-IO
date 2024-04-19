import { UserSchema } from "./user";
import { z } from "zod";

export const UserEventSchema = z.object({
  id: z.number(),
  eventId: z.number(),
  userId: z.number(),
  user: UserSchema.nullable(),
});

export type UserEvent = z.infer<typeof UserEventSchema>;
