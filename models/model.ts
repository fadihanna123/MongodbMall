import mongoose, { Document, Model, Schema } from "mongoose";

interface IUsers extends Document {
  fullname: string;
  username: string;
  email: string;
  mobnr: string;
  psw: string;
}

const UsersSchema = new Schema(
  {
    fullname: String,
    username: String,
    email: String,
    mobnr: String,
    psw: String,
  },
  { collection: "users" }
);

export const Users: Model<IUsers> = mongoose.model(
  "users",
  UsersSchema,
  "users"
);
