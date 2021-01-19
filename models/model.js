"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const UsersSchema = new mongoose_1.Schema({
    fullname: String,
    username: String,
    email: String,
    mobnr: String,
    psw: String,
}, { collection: "users" });
exports.Users = mongoose_1.model("users", UsersSchema, "users");
