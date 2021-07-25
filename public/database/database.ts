import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = () => {
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
