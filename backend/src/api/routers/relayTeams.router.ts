import express, { Request, Response } from "express";
import { IRelayTeam } from "../../../../global/interfaces";
import {
  getRelayTeamsForEvent,
  updateRelayTeams,
} from "../../database/repository/relayTeams.repo";

const router = express.Router();

router.get("/:eventId", async (req: Request, res: Response) => {
  const { eventId } = req.query;
  const relayTeams = await getRelayTeamsForEvent(eventId as string);
  return res.status(200).json(relayTeams);
});

//NOT USED AT THE MOMENT.
router.put("/", async (req: Request, res: Response) => {
  const newData: IRelayTeam[] = req.body;
  const result = await updateRelayTeams(newData);
  return res.status(200).json(result);
});

export default router;
