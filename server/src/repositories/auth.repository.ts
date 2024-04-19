import { UserModel } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";

class AuthRepository {
  private secret: Secret = String(process.env.ACCESS_TOKEN_SECRET);

  generateToken(user: UserModel) {
    const accessToken = jwt.sign({ user }, this.secret, {
      expiresIn: "60m",
    });

    return accessToken;
  }
}

export default new AuthRepository();
