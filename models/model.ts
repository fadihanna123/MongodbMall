import mongoose, { Model, Schema, model } from "mongoose";
import { IUsers } from "../typings/List";

const UsersSchema: Schema = new Schema(
  {
    fullname: String,
    username: String,
    email: String,
    mobnr: String,
    psw: String,
  },
  { collection: "users" }
);

export const Users: Model<IUsers> = model<IUsers>(
  "users",
  UsersSchema,
  "users"
);
