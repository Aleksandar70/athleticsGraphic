import express from "express";
import { updateCompetitors } from "../../database/repository/competitor.repo";
import type { ITableData } from "../interfaces/interfaces";

const routerCompetitor = express.Router();

routerCompetitor.put("/", async (req, res) => {
  const competitors: ITableData = req.body;
  const val = await updateCompetitors(competitors);
  return await res.status(200).json(val);
});

export default routerCompetitor;