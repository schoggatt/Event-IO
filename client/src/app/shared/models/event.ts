import { User } from "./user";
import { UserEvent } from "./user-event";

export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;

  userEvents: UserEvent[];
  owner: User;
}
