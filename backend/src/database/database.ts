import mongoose from "mongoose";

let database: mongoose.Connection;

export const connectDatabase = () => {
  if (database) {
    return;
  }
  mongoose.connect("mongodb://127.0.0.1:27017/athletics", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
