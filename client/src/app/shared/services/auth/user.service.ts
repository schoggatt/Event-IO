import { User } from "@/app/shared/models/user";
import axios from "axios";
import BaseService from "../base.service";
import { GoogleUser } from "@/app/api/auth/models/google-user";

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

  authenticateUser(user: GoogleUser): Promise<User> {
    return axios
      .post(`${this.apiEndpoint}/authenticate`, user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserById(id: number): Promise<User> {
    return axios
      .get(`${this.apiEndpoint}/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  }

  getUserByEmail(email: string): Promise<User> {
    return axios
      .get(`${this.apiEndpoint}/login/${email}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  }

  getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  createUser(user: User): Promise<User> {
    return axios
      .post(`${this.apiEndpoint}/create`, user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
