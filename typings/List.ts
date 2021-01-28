import { Document } from "mongoose";

export interface IUsers extends Document {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}
