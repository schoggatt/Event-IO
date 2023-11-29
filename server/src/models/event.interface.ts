import { RowDataPacket } from "mysql2";

export interface IEvent extends RowDataPacket {
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
