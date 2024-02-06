import { IBaseEntity } from "./base";
import { IUser, UserModel } from "./user";

export interface IUserEvent extends IBaseEntity {
  id: number;
  eventId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser | null;
}

export class UserEventModel implements IUserEvent {
  id: number;
  eventId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser | null;

  constructor(userEvent: IUserEvent) {
    this.id = userEvent.id;
    this.eventId = userEvent.eventId;
    this.userId = userEvent.userId;
    this.createdAt = userEvent.createdAt;
    this.updatedAt = userEvent.updatedAt;
    this.user = userEvent.user ? new UserModel(userEvent.user) : null;
  }
}
