import mongoose from "mongoose";
import { OpenTrack } from "../../../global/constants/api";

let database: mongoose.Connection;

export const connectDatabase = (): void => {
  if (database) {
    return;
  }
  mongoose.connect(
    `mongodb://127.0.0.1:27017/athletics-${OpenTrack.COMPETITION_ID}${OpenTrack.COMPETITION_YEAR}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
