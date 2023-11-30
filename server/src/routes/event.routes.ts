import { Router } from "express";
import EventController from "../controllers/event.controller";

class EventRoutes {
  router = Router();
  controller = new EventController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    /**
     * @openapi
     * /api/events/:
     *  post:
     *     tags:
     *     - Events
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.post("/", this.controller.create);

    /**
     * @openapi
     * /api/events/:
     *  get:
     *     tags:
     *     - Events
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.get("/", this.controller.retrieveAll);

    /**
     * @openapi
     * /api/events/{eventKey}:
     *  get:
     *     tags:
     *     - Events
     *     description: Get an event by key
     *  summary: Get an event by key
     *  parameters:
     *      - name: eventKey
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.get("/:eventKey", this.controller.retrieveById);

    /**
     * @openapi
     * /api/events/:
     *  put:
     *     tags:
     *     - Events
     *     description: TODO
     *     responses:
     *       200:
     *         description: TODO
     */
    this.router.put("/", this.controller.update);

    /**
     * @openapi
     * /api/events/{eventKey}:
     *  delete:
     *     tags:
     *     - Events
     *  summary: Delete an event by key
     *  parameters:
     *      - name: eventKey
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.delete("/:eventKey", this.controller.delete);
  }
}

export default new EventRoutes().router;
