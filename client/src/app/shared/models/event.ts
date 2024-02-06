import { User } from "./user";

export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}
