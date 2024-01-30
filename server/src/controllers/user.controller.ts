import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { User, UserModel } from "../models/user";

// Need to figure out how to get a return type of User for Prisma client calls
export default class UserController {
  async create(req: Request, res: Response) {
    const user: User = req.body;
    try {
      const newUser = await userRepository.create(user);
      if (newUser) {
        res.status(200).json(new UserModel(user as User));
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
    const user: User = req.body;
    try {
      const updatedUser = await userRepository.update(user);
      if (updatedUser) {
        res.status(200).json(new UserModel(updatedUser as User));
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
        res.status(200).json(new UserModel(user as User));
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
        res.status(200).json(new UserModel(user as User));
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving user." });
    }
  }

  async googleOAuthHandler(req: Request, res: Response) {
    try {
      const code = req.query.code as string;

      const { id_token, access_token } =
        await userRepository.getGoogleOAuthTokens({ code });

      const googleUser = await userRepository.getGoogleUser({
        id_token,
        access_token,
      });

      const user = await userRepository.create({
        id: 0,
        email: googleUser.email,
        providerId: googleUser.id,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User);

      // TODO: This should be changed later...
      res.send(new UserModel(user as User));
    } catch (err: any) {
      res.status(500).json({
        err,
        message: "Some error occurred inserting or retrieving user.",
      });
    }
  }
}
