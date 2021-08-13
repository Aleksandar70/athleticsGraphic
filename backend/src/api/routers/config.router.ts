import express from "express";
import { updateConfig, getConfig } from "../../database/repository/config.repo";

const router = express.Router();

router.get("/", async (_, res) => {
  const val = await getConfig();
  return await res.status(200).json(val);
});

router.put("/", async (req, res) => {
  const config = req.body;
  const val = await updateConfig(config);
  return await res.status(200).json(val);
});

export default router;