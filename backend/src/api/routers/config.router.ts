import express, { Request, Response } from "express";
import { IConfig } from "../../../../global/interfaces";
import {
  updateConfig,
  getConfig,
  addNewLocale,
} from "../../database/repository/config.repo";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  const val = await getConfig();
  return res.status(200).json(val);
});

router.put("/", async (req: Request, res: Response) => {
  const config: IConfig = req.body;
  const val = await updateConfig(config);
  return res.status(200).json(val);
});

router.post("/locale", async (req: Request, res: Response) => {
  const { name } = req.body;
  const val = await addNewLocale(name);
  return res.status(200).json(val);
});

export default router;
