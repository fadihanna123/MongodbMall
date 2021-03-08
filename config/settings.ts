import express from "express";
import cors from "cors";
import morgan from "morgan";
import { server } from "../config/GlobalSettings";

// Settings
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
