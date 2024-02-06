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
     * /api/events/{eventId}:
     *  get:
     *     tags:
     *     - Events
     *     description: Get an event by key
     *  summary: Get an event by key
     *  parameters:
     *      - name: eventId
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.get("/:eventId", this.controller.retrieveById);

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
     * /api/events/{eventId}:
     *  delete:
     *     tags:
     *     - Events
     *  summary: Delete an event by key
     *  parameters:
     *      - name: eventId
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.delete("/:eventId", this.controller.delete);

    /**
     * @openapi
     * /api/events/add/attendee:
     *  post:
     *     tags:
     *     - Events
     *  summary: Delete an event by key
     *  parameters:
     *      - name: eventId
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.post("/add/attendee", this.controller.addAttendee);

    /**
     * @openapi
     * /api/events/add/attendee:
     *  post:
     *     tags:
     *     - Events
     *  summary: Delete an event by key
     *  parameters:
     *      - name: eventId
     *        in: path
     *        description: The key of the event
     *        required: true
     *  responses:
     *     200:
     *       description: TODO
     */
    this.router.delete(
      "/remove/attendee/:userEventId",
      this.controller.removeAttendee
    );
  }
}

export default new EventRoutes().router;
