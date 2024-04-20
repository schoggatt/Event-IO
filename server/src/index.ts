import express, { Application } from "express";
import Routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_ORIGIN_URL || "https://localhost:3000",
      })
    );
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
