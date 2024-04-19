import { Response } from "express";
import { RoleModel } from "../models/role";
import { AuthenticatedRequest } from "./models/authenticated-request";

export function verifyPermissions(permissions: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: Function) => {
    const user = req.user;

    if (!user || !user.roles) {
      return res.status(401).json({
        type: "Unauthorized",
        message:
          "You require permissions to access this resource. Login to acquire a token.",
      });
    }

    const hasPermission = permissions.some((permission) =>
      user.roles.some((role: RoleModel) => role.name.includes(permission))
    );

    if (!hasPermission) {
      return res.status(401).json({
        type: "Unauthorized",
        message: "You require elevated permissions to access this resource.",
      });
    }

    next();
  };
}
