import express, { Request, Response } from "express";
import { getRelayTeams } from "../../database/repository/relayTeams.repo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const relayTeams = await getRelayTeams();
  return res.status(200).json(relayTeams);
});

export default router;
