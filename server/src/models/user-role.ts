import { IRole, RoleModel } from "./role";

export interface IUserRole {
  id: number;
  userId: number;
  roleId: number;
  role: IRole;
}

export class UserRoleModel implements IUserRole {
  id: number;
  userId: number;
  roleId: number;
  role: RoleModel;

  constructor(userRole: IUserRole) {
    this.id = userRole.id;
    this.userId = userRole.userId;
    this.roleId = userRole.roleId;
    this.role = new RoleModel(userRole.role);
  }
}
