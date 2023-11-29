import { Request, Response } from "express";

export function healthCheck(req: Request, res: Response): Response {
  return res.json({ message: "Server is running..." });
}
