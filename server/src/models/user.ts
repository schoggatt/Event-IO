import { IBaseEntity, IBaseModel } from "./base";

export interface IUser extends IBaseEntity {
  id: number;
  email: string;
  image?: string | null;
  firstName: string;
  lastName: string;
}

// TODO: This inheritance needs to be fixed and more clear.
export class UserModel implements IUser {
  id: number;
  email: string;
  image?: string | null;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.image = user.image;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
