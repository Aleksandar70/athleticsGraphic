import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import EventRouter from "./api/routers/event.router";
import CompetitorRouter from "./api/routers/competitor.router";
import { Paths } from "../../global/constants/api";
import { json } from "body-parser";

connectDatabase();

const app = express();
const port = Paths.SERVER_PORT;

app.use(json());
app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.COMPETITOR_PATH, CompetitorRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
