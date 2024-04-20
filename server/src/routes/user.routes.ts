import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyPermissions } from "../middleware/verifyPermissions";

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
    this.router.post("/create", this.controller.create);

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
     * /api/users/authenticate:
     *  get:
     *     tags:
     *     - Users
     *     description: Authenticates user to either login or create a new account.
     *     responses:
     *       200:
     *         description: Authenticates user to either login or create a new account.
     */
    this.router.post("/authenticate", this.controller.authenticateUser);

    // TODO: Move to auth controller
    this.router.post("/refresh", this.controller.refreshToken);
  }
}

export default new UserRoutes().router;
