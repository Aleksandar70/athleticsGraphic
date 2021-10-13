import express, { Request, Response } from "express";
import { getSignatures } from "../../database/repository/signature.repo";
import { addOrUpdateSignature } from "../../database/repository/signature.repo";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  const signatures = await getSignatures();
  return res.status(200).json(signatures);
});

router.put("/", async (req: Request, res: Response) => {
  const { data } = req.body;
  const result = await addOrUpdateSignature(data);
  return res.status(200).json(result);
});

export default router;
