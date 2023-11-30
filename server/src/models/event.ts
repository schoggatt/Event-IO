import { IBaseModel, IBaseEntity } from "./base";

export interface Event extends IBaseEntity {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
}

export interface EventModel extends IBaseModel {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
}
