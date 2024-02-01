import axios from "axios";
import { IUser } from "../models/user";
import { PrismaClient } from "@prisma/client";

class UserRepository {
  public prisma = new PrismaClient();

  create(user: IUser) {
    const newUser = this.prisma.users.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    });
    return newUser;
  }

  retrieveAll() {
    const users = this.prisma.users.findMany();
    return users;
  }

  retrieveByKey(userKey: number) {
    const user = this.prisma.users.findUnique({ where: { id: userKey } });
    return user;
  }

  retrieveByEmail(email: string) {
    const user = this.prisma.users.findUnique({ where: { email: email } });
    return user;
  }

  update(user: IUser) {
    this.prisma.users.update({
      where: { id: user.id },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return user;
  }

  delete(userKey: number) {
    const user = this.prisma.users.delete({ where: { id: userKey } });
    return user;
  }
}

export default new UserRepository();
