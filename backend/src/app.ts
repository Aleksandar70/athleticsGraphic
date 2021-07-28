import express from "express";
import cors from "cors";
import * as path from "path";
import { connectDatabase } from "./database/database";

connectDatabase();

const app = express();
const port = process.env.PORT || 5001;

app.get("*", async (_, res) =>
  res.sendFile(path.resolve(__dirname, "../public", "index.html"))
);

app.use(cors());
app.use(express.static("../public"));

app.listen(port, () => console.log(`Server is up at port ${port}`));
