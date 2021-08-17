import mongoose from "mongoose";
import { OpenTrack } from "../../../global/constants/api";

let database: mongoose.Connection;

export const connectDatabase = async (): Promise<void> => {
  if (database) {
    return;
  }
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/athletics-${OpenTrack.COMPETITION_ID}${OpenTrack.COMPETITION_YEAR}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
