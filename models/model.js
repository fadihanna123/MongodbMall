"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UsersSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    mobnr: String,
    psw: String,
}, { collection: "users" });
exports.default = mongoose_1.default.model("users", UsersSchema, "users");
