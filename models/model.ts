import mongoose from "mongoose";

const Schema = mongoose.Schema;
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

export default mongoose.model("users", UsersSchema, "users");
