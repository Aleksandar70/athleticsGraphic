import express, { Request, Response } from "express";
// import { ITableData } from "../../../../global/interfaces";
// import { updateCompetitors } from "../../database/repository/competitor.repo";

const routerCompetitor = express.Router();

// TODO: FIX THIS

routerCompetitor.put("/", async (req: Request, res: Response) => {
  // const competitors: ITableData = req.body;
  // const val = await updateCompetitors(competitors);
  // return await res.status(200).json(val);
});

export default routerCompetitor;
