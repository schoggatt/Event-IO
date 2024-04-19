import { UserSchema } from "./user";
import { UserEventSchema } from "./user-event";
import { z } from "zod";

export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string(),
  userEvents: z.array(UserEventSchema),
  owner: UserSchema,
});

export type Event = z.infer<typeof EventSchema>;
