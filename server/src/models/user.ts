// id: string;
//   email: string;
//   verified_email: boolean;
//   name: string;
//   given_name: string;
//   family_name: string;
//   picture: string;
//   locale: string;

import { RowDataPacket } from "mysql2";
import { BaseModel } from "./base";

// {
//     id: '107125695382826110135',
//     email: 'samuelchoggatt@gmail.com',
//     verified_email: true,
//     name: 'Sam Hoggatt',
//     given_name: 'Sam',
//     family_name: 'Hoggatt',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocLju4SJB7SiqYiIK3VSeZz62egl-5cSFsN_yMKyFV3R=s96-c',
//     locale: 'en'
//   }

export interface User extends RowDataPacket, BaseModel {
  userKey: number;
  providerId: string | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  pictureSource: string | null;
}
