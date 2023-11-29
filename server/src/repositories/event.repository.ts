import { ResultSetHeader } from "mysql2";
import connection from "../db";
import { IEvent } from "../models/event.interface";

interface IEventRepository {
  create(event: IEvent): Promise<IEvent>;
  retrieveAll(): Promise<IEvent[]>;
  retrieveByKey(eventKey: number): Promise<IEvent | undefined>;
  update(event: IEvent): Promise<number>;
  delete(eventKey: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class EventRepository implements IEventRepository {
  create(event: IEvent): Promise<IEvent> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO events (name, description, location, imageSource, externalSource) VALUES (?, ?, ?, ?, ?)",
        [
          event.name,
          event.description,
          event.location,
          event.imageSource,
          event.externalSource,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve({ ...event });
        }
      );
    });
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

  retrieveByKey(eventKey: number): Promise<IEvent | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IEvent[]>(
        "SELECT * FROM events WHERE eventKey = ?",
        [eventKey],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(event: IEvent): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE events SET name = ?, description = ?, location = ?, imageSource = ?, externalSource = ?, WHERE eventKey = ?",
        [
          event.name,
          event.description,
          event.location,
          event.imageSource,
          event.externalSource,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(eventKey: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM events WHERE eventKey = ?",
        [eventKey],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM events", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new EventRepository();
