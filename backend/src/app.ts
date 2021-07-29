import express from "express";
import cors from "cors";
import * as path from "path";
import { connectDatabase } from "./database/database";
import { SignatureModel } from "./models/signature.model";
// import { EventModel } from "./models/event.model";

connectDatabase();

const app = express();
const port = process.env.PORT || 5001;

app.get("*", async (_, res) =>
  res.sendFile(path.resolve(__dirname, "../public", "index.html"))
);

app.use(cors());
app.use(express.static("../public"));

app.listen(port, () => console.log(`Server is up at port ${port}`));
console.log("SignatureModel.createNewSignature ", SignatureModel.createNewSignature({
  name: "Emma",
  title: "Bradley"
}));

console.log("SignatureModel.createNewSignature ", SignatureModel.createNewSignature({
  name: "Berda",
  title: "Car"
}));

console.log("SignatureModel.getSignatures ", SignatureModel.getSignatures());

// console.log(EventModel.createEvent("12","123","1234"));