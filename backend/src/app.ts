import express from "express";
import cors from "cors";
import { connectDatabase } from "./database/database";
import EventRouter from "./api/routers/event.router";
import CompetitorRouter from "./api/routers/competitor.router";
import ConfigRouter from "./api/routers/config.router";
import DatabaseRouter from "./api/routers/database.router";
import TrialsRouter from "./api/routers/trials.router";
import ResultsRouter from "./api/routers/results.router";
import RelayTeamsRouter from "./api/routers/relayTeams.router";
import { Paths } from "../../global/constants/api";
import { json } from "body-parser";
import { createDefaultLocale } from "./utils/i18n.util";

connectDatabase().catch((err) =>
  console.log("Error while connecting to the databsae: ", err.message)
);
createDefaultLocale();

const app = express();
const port = Paths.SERVER_PORT;

app.use(json());
app.use(cors());
app.use(Paths.EVENTS_PATH, EventRouter);
app.use(Paths.COMPETITOR_PATH, CompetitorRouter);
app.use(Paths.TRIALS_PATH, TrialsRouter);
app.use(Paths.RESULTS_PATH, ResultsRouter);
app.use(Paths.RELAY_TEAMS_PATH, RelayTeamsRouter);
app.use(Paths.CONFIG_PATH, ConfigRouter);
app.use(Paths.DATABASE_PATH, DatabaseRouter);

app.listen(port, () => console.log(`Server is up at port ${port}`));
