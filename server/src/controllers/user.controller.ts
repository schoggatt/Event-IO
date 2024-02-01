import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, UserModel } from "../models/user";
import { IGoogleUser } from "../models/google-user";

// Need to figure out how to get a return type of User for Prisma client calls
export default class UserController {
  async create(req: Request, res: Response) {
    const user: IUser = req.body;
    try {
      const newUser = await userRepository.create(user);
      if (newUser) {
        res.status(200).json(new UserModel(user as IUser));
      } else {
        res
          .status(500)
          .json({ message: "Some error occurred while creating user." });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving users." });
    }
  }

  async update(req: Request, res: Response) {
    const user: IUser = req.body;
    try {
      const updatedUser = await userRepository.update(user);
      if (updatedUser) {
        res.status(200).json(new UserModel(updatedUser as IUser));
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving users." });
    }
  }

  async retrieveById(req: Request, res: Response) {
    const userKey: number = parseInt(req.params.userKey);
    try {
      const user = await userRepository.retrieveByKey(userKey);
      if (user) {
        res.status(200).json(new UserModel(user as IUser));
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving user." });
    }
  }

  async retrieveByEmail(req: Request, res: Response) {
    const email: string = req.params.email;
    try {
      const user = await userRepository.retrieveByEmail(email);
      if (user) {
        res.status(200).json(new UserModel(user as IUser));
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving user." });
    }
  }

  async authenticateUser(req: Request, res: Response) {
    const user: IGoogleUser = req.body;
    try {
      const existingUser = await userRepository.retrieveByEmail(user.email);
      if (existingUser) {
        return res.status(200).json(new UserModel(existingUser as IUser));
      }
      const newUser = await userRepository.create(user);
      return res.status(200).json(new UserModel(newUser as IUser));
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while authenticating user." });
    }
  }
}
