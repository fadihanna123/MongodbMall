import "dotenv/config";

import mongoose from "mongoose";

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
