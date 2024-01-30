import { IBaseEntity, IBaseModel } from "./base";

export interface User extends IBaseEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserModel implements IBaseModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
