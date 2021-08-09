import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import ResultRouter from "./api/routes/result.routes";

connectDatabase();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use("/result", ResultRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
