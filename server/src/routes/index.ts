import { Application } from "express";
import eventRoutes from "./event.routes";
import homeRoutes from "./home.routes";
import userRoutes from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/events", eventRoutes);
    app.use("/api/users", userRoutes);
  }
}
