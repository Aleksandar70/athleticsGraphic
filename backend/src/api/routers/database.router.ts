import express, { Request, Response } from "express";
import { initialize } from "../../database/database";

const router = express.Router();

router.post("/", async (_: Request, res: Response) => {
  const val = await initialize();
  return res.status(200).json(val);
});

export default router;
