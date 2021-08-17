import express, { Request, Response } from "express";
import { findCompetitorsForEvent } from "../../database/repository/competitor.repo";
import { getEvents } from "../../database/repository/event.repo";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  const events = await getEvents();
  return res.status(200).json(events);
});

router.get("/:eventId", async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const competitors = await findCompetitorsForEvent(eventId);
  return res.status(200).json(competitors);
});

export default router;
