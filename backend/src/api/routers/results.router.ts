import express, { Request, Response } from "express";
import { updateResults } from "../../database/repository/result.repo";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  const newData: Record<string, string>[] = req.body;
  const result = await updateResults(newData);
  return res.status(200).json(result);
});

export default router;
