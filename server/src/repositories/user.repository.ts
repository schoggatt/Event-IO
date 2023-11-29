import axios from "axios";
import googleConfig from "../config/google.config";
import qs from "qs";
import { User } from "../models/user";
import connection from "../db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";

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

interface UserRepository {
  create(user: User): Promise<User>;
  retrieveByKey(userKey: number): Promise<User | undefined>;
  update(user: User): Promise<number>;
  getGoogleOAuthTokens({ code }: { code: string }): Promise<GoogleTokensResult>;
  getGoogleUser(tokens: {
    id_token: string;
    access_token: string;
  }): Promise<GoogleUserResult>;
}

class UserRepository implements UserRepository {
  async create(user: User) {
    const salt = await bcrypt.genSalt(10);
    const password =
      user.password.length > 0 ? await bcrypt.hash(user.password, salt) : "";
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO users (email, providerId, password, firstName, lastName, pictureSource) VALUES (?, ?, ?, ?, ?, ?)",
        [
          user.email,
          user.providerId,
          password,
          user.firstName,
          user.lastName,
          user.pictureSource,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve({ ...user });
        }
      );
    });
  }

  async retrieveByKey(eventKey: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM users WHERE eventKey = ?",
        [eventKey],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  async update(user: User): Promise<number> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE users SET email = ?, id = ?, password = ?, firstName = ?, lastName = ?, pictureSource = ?, WHERE userKey = ?",
        [
          user.email,
          user.id,
          hashedPassword,
          user.firstName,
          user.lastName,
          user.pictureSource,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
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
