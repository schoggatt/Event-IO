import express, { Application } from "express";
import Routes from "./routes";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
