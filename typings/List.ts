import { Request as ExpressRequest } from "express";
import { Document } from "mongoose";

export interface IUsers extends Document {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}

export interface IUsers {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}

export interface Request extends ExpressRequest {
  user?: IUsers;
}
