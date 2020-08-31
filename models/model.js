const mongoose = require("mongoose");
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

module.exports = mongoose.model("users", UsersSchema, "users");
