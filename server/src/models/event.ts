import { IBaseEntity } from "./base";

export interface Event extends IBaseEntity {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
}
