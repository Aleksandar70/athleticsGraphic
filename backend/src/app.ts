import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import EventRouter from "./api/routers/event.router";
import CompetitorRouter from "./api/routers/competitor.router";
import ConfigRouter from "./api/routers/config.router";
import { Paths } from "../../global/constants/api";
import { json } from "body-parser";
import { getOTCompetitionData } from "./api/opentrack.api";
import { createCompetition } from "./database/repository/competition.repo";
import { createCompetitors } from "./database/repository/competitor.repo";
import { createEvents } from "./database/repository/event.repo";
import { createDefaultConfig } from "./database/repository/config.repo";

connectDatabase()
  .then(async () => {
    console.log("Connected to database");
    await createDefaultConfig();
    const otCompetitionData = await getOTCompetitionData();
    await createCompetition(otCompetitionData.competitionData);
    await createCompetitors(otCompetitionData.competitorsData);
    await createEvents(otCompetitionData.eventsData);
  })
  .catch((error) =>
    console.log("Error connecting to database:", error.message)
  );

const app = express();
const port = Paths.SERVER_PORT;

app.use(json());
app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.COMPETITOR_PATH, CompetitorRouter);
app.use(Paths.CONFIG_PATH, ConfigRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
