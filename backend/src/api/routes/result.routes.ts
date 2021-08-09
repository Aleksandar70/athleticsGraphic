import express from "express";
import { OpenTrack } from "../../../../constants/api";
import { updateTable } from "../../database/repository/result.repo";
import { getHorizontalResult } from "../horizontal_discipline/horizontal.api.data";
import type { IResultParams } from "../interfaces/interfaces";

const router = express.Router();

router.get("/", async (req, res) => {
  const params: IResultParams = req.query;
  console.log("paramsmoje: ", params);
  const val = await getHorizontalResult(
    params,
    OpenTrack.RUN_60M_F_ID,
    OpenTrack.RUN_60M_F
  );
  return await res.status(200).json(val);
});

router.post("/", async (req, res) => {
  console.log("reqMoje", req); //{} 1
  const params = req.query;
  console.log("params: IResultParams ", params); //{} 2
  const val = await updateTable(params);
  return await res.status(200).json(val);
});

export default router;
