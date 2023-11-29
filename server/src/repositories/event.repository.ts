import { ResultSetHeader } from "mysql2";
import connection from "../db";
import { Event } from "../models/event";

interface EventRepository {
  create(event: Event): Promise<Event>;
  retrieveAll(): Promise<Event[]>;
  retrieveByKey(eventKey: number): Promise<Event | undefined>;
  update(event: Event): Promise<number>;
  delete(eventKey: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class EventRepository implements EventRepository {
  create(event: Event): Promise<Event> {
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

  retrieveAll(): Promise<Event[]> {
    let query: string = "SELECT * FROM events";

    return new Promise((resolve, reject) => {
      connection.query<Event[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveByKey(eventKey: number): Promise<Event | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<Event[]>(
        "SELECT * FROM events WHERE eventKey = ?",
        [eventKey],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(event: Event): Promise<number> {
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
