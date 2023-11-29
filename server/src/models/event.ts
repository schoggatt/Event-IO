import { RowDataPacket } from "mysql2";
import { BaseModel } from "./base";

export interface Event extends RowDataPacket, BaseModel {
  eventKey: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  imageSource: string;
  externalSource: string;
  // tags: string[];
  // attendees: any[];
  // createdAt: Date;
  // updatedAt: Date;
}
