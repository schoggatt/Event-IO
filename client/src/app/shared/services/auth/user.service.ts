import { User, UserSchema } from "@/app/shared/models/user";
import axios from "axios";
import BaseService from "../base.service";
import { GoogleUser } from "@/app/api/auth/models/google-user";
import { z } from "zod";

interface IUserService {
  getUserById(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
  createUser(user: User): Promise<User>;
}

export default class UserService extends BaseService implements IUserService {
  constructor() {
    super("users");
  }

  authenticateUser(user: GoogleUser): Promise<string> {
    return axios
      .post(`${this.apiEndpoint}/authenticate`, user, this.config)
      .then((res) => {
        return z.string().parse(res.data);
      });
  }

  getUserById(id: number): Promise<User> {
    return axios.get(`${this.apiEndpoint}/${id}`).then((res) => res.data);
  }

  getUserByEmail(email: string): Promise<User> {
    return axios
      .get(`${this.apiEndpoint}/login/${email}`, this.config)
      .then((res) => UserSchema.parse(res.data));
  }

  getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  createUser(user: User): Promise<User> {
    return axios
      .post(`${this.apiEndpoint}/create`, user, this.config)
      .then((res) => {
        return UserSchema.parse(res.data);
      });
  }
}
