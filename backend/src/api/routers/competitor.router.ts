import express, { Request, Response } from "express";
import { ICompetitor } from "../../database/interfaces";
import { updateCompetitors } from "../../database/repository/competitor.repo";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  const newData: ICompetitor[] = req.body;
  const result = await updateCompetitors(newData);
  return res.status(200).json(result);
});

export default router;
