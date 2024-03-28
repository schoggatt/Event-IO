import { IBaseEntity, IBaseModel } from "./base";
import { IUser, UserModel } from "./user";
import { IUserEvent, UserEventModel } from "./user-event";

export interface IEvent extends IBaseEntity {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  userEvents: IUserEvent[];
  owner: IUser;
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

  userEvents: UserEventModel[];
  owner: UserModel;

  constructor(event: IEvent) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.location = event.location;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
    this.userEvents = event.userEvents.map(
      (userEvent) => new UserEventModel(userEvent)
    );
    this.owner = new UserModel(event.owner);
  }
}
