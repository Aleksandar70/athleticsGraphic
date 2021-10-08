import express, { Request, Response } from "express";
import { emitGraphcsData } from "../../service/graphics.service";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { data } = req.body;
  emitGraphcsData(data);
  return res.status(200);
});

export default router;
