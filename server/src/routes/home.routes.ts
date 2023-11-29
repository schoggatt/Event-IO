import { Router } from "express";
import { healthCheck } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    /**
     * @openapi
     * /api/healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    this.router.get("/healthcheck", healthCheck);
  }
}

export default new HomeRoutes().router;
