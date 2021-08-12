import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import ResultRouter from "./api/routes/result.routes";
import EventRouter from "./api/routes/event.routes";
import CompetitorRouter from "./api/routes/competitor.routes";
import { Paths } from "../../global/constants/api";
import { json } from "body-parser";

connectDatabase();

const app = express();
const port = Paths.SERVER_PORT;

app.use(json());
app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.RESULTS_PATH, ResultRouter);
app.use(Paths.COMPETITOR_PATH, CompetitorRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
