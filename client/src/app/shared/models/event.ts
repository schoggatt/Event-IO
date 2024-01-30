import { IUser } from "./user";

export interface IEvent {
  key: number;
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  url: string;
  tags: string[];
  eventOwner?: IUser; // This should be required, but we'll leave it optional for now
  attendees: IUser[];
  createdAt: Date;
  updatedAt: Date;
}
