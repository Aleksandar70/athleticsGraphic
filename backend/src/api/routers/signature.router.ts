import express, { Request, Response } from "express";
import { getSignatures } from "../../database/repository/signature.repo";
import { levelMap } from "../../database/database";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { locked } = req.query;
  await levelMap.put("locked", locked ?? []);
  const signatures = await getSignatures();
  return res.status(200).json(signatures);
});

export default router;
