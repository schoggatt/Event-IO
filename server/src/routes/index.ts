import { Application } from "express";
import eventRoutes from "./event.routes";
import homeRoutes from "./home.routes";
import userRoutes from "./user.routes";
import { verifyJWT } from "../middleware/verifyJWT";

export default class Routes {
  constructor(app: Application) {
    app.use(verifyJWT);

    app.use("/api", homeRoutes);
    app.use("/api/events", eventRoutes);
    app.use("/api/users", userRoutes);
  }
}
