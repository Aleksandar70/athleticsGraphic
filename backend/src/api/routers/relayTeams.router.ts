import express, { Request, Response } from "express";
import { IRelayTeam } from "../../../../global/interfaces";
import {
  getRelayTeams,
  getRelayTeamsForEvent,
  updateRelayTeams,
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

router.put("/", async (req: Request, res: Response) => {
  const newData: IRelayTeam[] = req.body;
  const result = await updateRelayTeams(newData);
  return res.status(200).json(result);
});

export default router;
