import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import ResultRouter from "./api/routes/result.routes";
import EventRouter from "./api/routes/event.routes";
import { Paths } from "../../global/constants/api";

connectDatabase();

const app = express();
const port = Paths.SERVER_PORT;

app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.RESULTS_PATH, ResultRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
