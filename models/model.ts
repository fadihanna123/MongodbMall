import mongoose, { Document, Model, Schema, model } from "mongoose";

interface IUsers extends Document {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}

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
