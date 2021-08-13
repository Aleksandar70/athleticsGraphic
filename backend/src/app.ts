import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import EventRouter from "./api/routers/event.router";
import CompetitorRouter from "./api/routers/competitor.router";
import { Paths } from "../../global/constants/api";
import { json } from "body-parser";
import { getOTCompetitionData } from "./api/opentrack";
import { createCompetition } from "./database/repository/competition.repo";
import { createCompetitors } from "./database/repository/competitor.repo";
import { createEvents } from "./database/repository/event.repo";

connectDatabase()
  .then(async (_) => {
    console.log("Connected to database");
    const otCompetitionData = await getOTCompetitionData();
    createCompetition(otCompetitionData.competitionData);
    await createCompetitors(otCompetitionData.copetitorsData);
    await createEvents(otCompetitionData.eventsData);
  })
  .catch((_) => console.log("Error connecting to database"));

const app = express();
const port = Paths.SERVER_PORT;

app.use(json());
app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.COMPETITOR_PATH, CompetitorRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
