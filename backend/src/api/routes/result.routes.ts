import express from "express";
import { getResultForEvent } from "../results/results.api.data";
import type { IResultParams } from "../../../../global/interfaces";

const router = express.Router();

router.get("/", async (req, res) => {
  const params: IResultParams = req.query;
  const val = await getResultForEvent(params);
  return await res.status(200).json(val);
});

export default router;
