import express from "express";
import { findCompetitorsForEvent } from "../../database/repository/competitor.repo";
import { getAllEvents } from "../events.api";

const router = express.Router();

router.get("/", async (_, res) => {
  const events = await getAllEvents("local");
  return await res.status(200).json(events);
});

router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const competitors = await findCompetitorsForEvent(eventId);
  return await res.status(200).json(competitors);
});

export default router;
