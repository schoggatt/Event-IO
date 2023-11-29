import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { User } from "../models/user";

export default class UserController {
  async create(req: Request, res: Response) {
    const user: User = req.body;
    try {
      const newUser = await userRepository.create(user);
      if (newUser) {
        res.status(200).json(event);
      } else {
        res
          .status(500)
          .json({ message: "Some error occurred while creating event." });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }

  async update(req: Request, res: Response) {
    const event: User = req.body;
    try {
      const updatedEvent = await userRepository.update(event);
      if (updatedEvent) {
        res.status(200).json(updatedEvent);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving events." });
    }
  }

  async retrieveById(req: Request, res: Response) {
    const userKey: number = parseInt(req.params.eventKey);
    try {
      const user = await userRepository.retrieveByKey(userKey);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Some error occurred while retrieving event." });
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
        userKey: 0,
        email: googleUser.email,
        password: "",
        providerId: googleUser.id,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        pictureSource: googleUser.picture,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User);

      // TODO: This should be changed later...
      res.send(user);
    } catch (err: any) {
      res.status(500).json({
        err,
        message: "Some error occurred inserting or retrieving user.",
      });
    }
  }
}
