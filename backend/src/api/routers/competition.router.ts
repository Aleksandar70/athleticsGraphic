import express from "express";
import { createCompetition } from "../../database/repository/competition.repo";
import { createCompetitors } from "../../database/repository/competitor.repo";
import { createEvents } from "../../database/repository/event.repo";
import { getOTCompetitionData } from "../opentrack";

const router = express.Router();

router.get("/", async (_, res) => {
  const otCompetitionData = await getOTCompetitionData();
  createCompetition(otCompetitionData.competitionData);
  await createCompetitors(otCompetitionData.copetitorsData);
  await createEvents(otCompetitionData.eventsData);
  // return await res.status(200).json(val.competitionData);
});

export default router;
