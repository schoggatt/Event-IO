export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  // image: string;
  // url: string;
  // tags: string[];
  // eventOwner?: IUser; // This should be required, but we'll leave it optional for now
  // attendees: IUser[];
  createdAt: Date;
  updatedAt: Date;
}
