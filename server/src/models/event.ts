import { IBaseEntity, IBaseModel } from "./base";
import { IUser, UserModel } from "./user";

export interface IEvent extends IBaseEntity {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  users: IUser[];
}

export class EventModel implements IEvent {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;

  users: UserModel[];

  constructor(event: IEvent) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.location = event.location;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
    this.users = event.users.map((user) => new UserModel(user));
  }
}
