import { IUser } from "../models/user";
import { PrismaClient } from "@prisma/client";
import { IGoogleUser } from "../models/google-user";
import { ConvertToUserModel } from "../models/extensions/user.extension";

class UserRepository {
  public prisma = new PrismaClient();

  async create(user: IGoogleUser | IUser) {
    const newUser = await this.prisma.users.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    return ConvertToUserModel(newUser);
  }

  retrieveAll() {
    const users = this.prisma.users.findMany();
    return users;
  }

  retrieveByKey(userKey: number) {
    const user = this.prisma.users.findUnique({ where: { id: userKey } });
    return user;
  }

  async retrieveByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    return ConvertToUserModel(user);
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
