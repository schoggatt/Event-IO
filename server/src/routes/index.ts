import { Application } from "express";
import eventRoutes from "./event.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/events", eventRoutes);
  }
}
