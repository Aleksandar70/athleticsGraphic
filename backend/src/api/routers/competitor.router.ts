import express, { Request, Response } from "express";
import { ICompetitor } from "../../database/interfaces";
import {
  findCompetitorsForEvent,
  updateCompetitors,
} from "../../database/repository/competitor.repo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { eventId } = req.query;
  const competitors = await findCompetitorsForEvent(eventId as string);
  return res.status(200).json(competitors);
});

router.put("/", async (req: Request, res: Response) => {
  const newData: ICompetitor[] = req.body;
  const result = await updateCompetitors(newData);
  return res.status(200).json(result);
});

export default router;
