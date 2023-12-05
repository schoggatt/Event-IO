import { IBaseEntity, IBaseModel } from "./base";

export interface User extends IBaseEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
