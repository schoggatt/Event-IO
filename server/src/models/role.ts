import { IBaseEntity } from "./base";

export interface IRole extends IBaseEntity {
  id: number;
  name: string;
}

export class RoleModel implements IRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(role: IRole) {
    this.id = role.id;
    this.name = role.name;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
  }
}
