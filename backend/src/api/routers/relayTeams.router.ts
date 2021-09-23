import express, { Request, Response } from "express";
import {
  getRelayTeams,
  getRelayTeamsForEvent,
} from "../../database/repository/relayTeams.repo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const relayTeams = await getRelayTeams();
  return res.status(200).json(relayTeams);
});

router.get("/:eventId", async (req: Request, res: Response) => {
  const { eventId } = req.query;
  const relayTeams = await getRelayTeamsForEvent(eventId as string);
  return res.status(200).json(relayTeams);
});

export default router;
