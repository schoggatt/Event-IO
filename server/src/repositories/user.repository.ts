import axios from "axios";
import googleConfig from "../config/google.config";
import qs from "qs";
import { User } from "../models/user";
import connection from "../db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

class UserRepository {
  public prisma = new PrismaClient();

  create(user: User) {
    const newUser = this.prisma.users.create({ data: user });
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

  update(user: User) {
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

  async getGoogleOAuthTokens({
    code,
  }: {
    code: string;
  }): Promise<GoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";

    const config = {
      code,
      client_id: googleConfig.CLIENT_ID as string,
      client_secret: googleConfig.CLIENT_SECRET as string,
      redirect_uri: googleConfig.REDIRECT_URI as string,
      grant_type: "authorization_code",
    };

    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        qs.stringify(config),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error(error.response.data.error);
      throw new Error(error.message);
    }
  }

  async getGoogleUser(tokens: {
    id_token: string;
    access_token: string;
  }): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.error(error, "Error getting Google user");
      throw new Error(error.message);
    }
  }
}

export default new UserRepository();
