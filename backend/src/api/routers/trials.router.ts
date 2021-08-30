import express, { Request, Response } from "express";
import { ITrial } from "../../database/interfaces";
import { updateTrials } from "../../database/repository/trial.repo";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  const newData: ITrial[] = req.body;
  const result = await updateTrials(newData);
  return res.status(200).json(result);
});

export default router;
