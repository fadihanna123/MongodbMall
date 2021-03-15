import mongoose, { Model, model, Schema } from "mongoose";

import { IUsers } from "../typings";

const UsersSchema: Schema = new Schema(
  {
    uname: String,
    psw: String,
  },
  { collection: "users" }
);

export const Users: Model<IUsers> = model<IUsers>(
  "users",
  UsersSchema,
  "users"
);
