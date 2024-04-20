import { User, UserSchema } from "@/app/shared/models/user";
import axios from "axios";
import BaseService from "../base.service";
import { GoogleUser } from "@/app/api/auth/models/google-user";
import { z } from "zod";
import jwt from "jsonwebtoken";

const AccessJwtPayloadSchema = z.object({
  user: UserSchema,
});

interface IUserService {
  authenticateUser(user: GoogleUser): Promise<User>;
  getUserById(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
  createUser(user: User): Promise<User>;
}

export default class UserService extends BaseService implements IUserService {
  constructor() {
    super("/users");
  }

  // TODO: Move this to the auth service
  authenticateUser(user: GoogleUser): Promise<User> {
    return this.api.post(`${this.apiSuffix}/authenticate`, user).then((res) => {
      const accessToken = z.string().parse(res.data);
      localStorage.setItem("accessToken", accessToken);

      const decodedToken = AccessJwtPayloadSchema.parse(
        jwt.decode(accessToken)
      );
      return decodedToken.user;
    });
  }

  getUserById(id: number): Promise<User> {
    return this.api.get(`${this.apiSuffix}/${id}`).then((res) => res.data);
  }

  getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  createUser(user: User): Promise<User> {
    return this.api.post(`${this.apiSuffix}/create`, user).then((res) => {
      return UserSchema.parse(res.data);
    });
  }
}
