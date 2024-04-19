import { IBaseEntity, IBaseModel } from "./base";
import { IRole, RoleModel } from "./role";

export interface IUser extends IBaseEntity {
  id: number;
  email: string;
  image?: string | null;
  firstName: string;
  lastName: string;
  roles: IRole[];
}

export class UserModel implements IUser {
  id: number;
  email: string;
  image?: string | null;
  firstName: string;
  lastName: string;
  roles: RoleModel[];
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

    this.roles = user.roles.map((role) => new RoleModel(role));
  }
}
