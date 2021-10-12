import express, { Request, Response } from "express";
import { emitGraphcsData, clearGraphcs } from "../../service/graphics.service";

const router = express.Router();

router.post("/clear", async (_: Request, res: Response) => {
  clearGraphcs();
  return res.status(200).json({});
});

router.post("/", async (req: Request, res: Response) => {
  const { data } = req.body;
  emitGraphcsData(data);
  return res.status(200).json({});
});

export default router;
