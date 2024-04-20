import { UserModel } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";

class AuthRepository {
  private secret: Secret = String(process.env.ACCESS_TOKEN_SECRET);

  // TODO: Need to handle creating new refresh tokens
  generateToken(user: UserModel) {
    const accessToken = jwt.sign({ user }, this.secret, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign({ user }, this.secret, { expiresIn: "1d" });

    return { accessToken, refreshToken };
  }

  refreshToken(token: string) {
    return jwt.verify(token, this.secret, (err, decoded) => {
      if (err) {
        throw new Error(err.message);
      } else {
        const accessToken = jwt.sign({ user: decoded }, this.secret, {
          expiresIn: "1m",
        });
        return accessToken;
      }
    });
  }
}

export default new AuthRepository();
