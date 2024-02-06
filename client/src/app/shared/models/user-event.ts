import { User } from "./user";

export interface UserEvent {
  id: number;
  eventId: number;
  userId: number;

  user?: User | null;
}
