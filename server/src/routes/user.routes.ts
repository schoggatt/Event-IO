import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    /**
     * @openapi
     * /api/users/create:
     *  post:
     *     tags:
     *     - Users
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.post("/register", this.controller.create);

    /**
     * @openapi
     * /api/users/update:
     *  put:
     *     tags:
     *     - Users
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.put("/update", this.controller.update);

    /**
     * @openapi
     * /api/users/{userKey}:
     *  get:
     *     tags:
     *     - Users
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.get("/:userKey", this.controller.retrieveById);

    /**
     * @openapi
     * /api/users/login/{email}:
     *  get:
     *     tags:
     *     - Users
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.get("/login/:email", this.controller.retrieveByEmail);

    /**
     * @openapi
     * /api/users/oauth/google:
     *  get:
     *     tags:
     *     - Users
     *     description: Acquires token for OAuth with Google
     *     responses:
     *       200:
     *         description: Acquires token for OAuth on the given Google account
     */
    this.router.get("/oauth/google", this.controller.googleOAuthHandler);
  }
}

export default new UserRoutes().router;
