import connection from "../db";
import { IEvent } from "../models/event.interface";

interface IEventRepository {
  save(tutorial: IEvent): Promise<IEvent>;
  retrieveAll(): Promise<IEvent[]>;
  retrieveById(tutorialId: number): Promise<IEvent | undefined>;
  update(tutorial: IEvent): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class EventRepository implements IEventRepository {
  save(tutorial: IEvent): Promise<IEvent> {
    throw new Error("Method not implemented.");
  }

  retrieveAll(): Promise<IEvent[]> {
    let query: string = "SELECT * FROM events";

    return new Promise((resolve, reject) => {
      connection.query<IEvent[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(tutorialId: number): Promise<IEvent | undefined> {
    throw new Error("Method not implemented.");
  }
  update(tutorial: IEvent): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(tutorialId: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export default new EventRepository();
