import { IBaseEntity, IBaseModel } from "./base";

export interface IUser extends IBaseEntity {
  id: number;
  email: string;
  image?: string;
  firstName: string;
  lastName: string;
}

export class UserModel implements IBaseModel {
  id: number;
  email: string;
  image?: string;
  firstName: string;
  lastName: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.image = user.image;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
