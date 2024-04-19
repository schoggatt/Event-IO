import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user";
import { Response } from "express";
import { AuthenticatedRequest } from "./models/authenticated-request";

interface TokenPayload extends JwtPayload {
  user: UserModel;
}

export function verifyJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: Function
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next();
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as TokenPayload;
    req.user = decodedToken.user;
    next();
  } catch (err) {
    return res.status(400).json({
      type: "Bad Request",
      message: "Invalid token. Please log in again to get a new token.",
    });
  }
}
