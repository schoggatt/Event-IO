import { UserModel } from "../../models/user";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: UserModel;
}
