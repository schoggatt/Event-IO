import { IUser, UserModel } from "../user";
import { IUserRole } from "../user-role";

// TODO: I should use Zod here...
export function ConvertToUserModel(user: any) {
  const mappedUser: IUser = {
    id: user.id,
    email: user.email,
    image: user.image,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.userRoles
      ? user.userRoles.map((userRole: IUserRole) => userRole.role)
      : [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return new UserModel(mappedUser);
}
