import mongoose from "mongoose";
import "dotenv/config";

// Connect to database
mongoose.connect(
  <string>process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected... \n ")
);
