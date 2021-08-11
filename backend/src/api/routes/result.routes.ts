import express from "express";
import { OpenTrack } from "../../../../constants/api";
import { updateTable } from "../../database/repository/competitor.repo";
import { getHorizontalResult } from "../horizontal_discipline/horizontal.api.data";
import type { IResultParams, ITableData } from "../interfaces/interfaces";

const router = express.Router();

router.get("/", async (req, res) => {
  const params: IResultParams = req.query;
  const val = await getHorizontalResult(
    params,
    OpenTrack.RUN_60M_F_ID,
    OpenTrack.RUN_60M_F
  );
  return await res.status(200).json(val);
});

router.put("/", async (req, res) => {
  const params: ITableData = req.body;
  const val = await updateTable(params);
  return await res.status(200).json(val);
});

export default router;
