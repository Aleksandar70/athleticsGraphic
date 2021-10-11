import express, { Request, Response } from "express";
import { getSignatures } from "../../database/repository/signature.repo";
import { ISignatures } from "../../database/interfaces";
import { addNewSignature } from "../../database/repository/signature.repo";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  console.log("USAO");
  const signatures = await getSignatures();
  return res.status(200).json(signatures);
});

router.put("/", async (req: Request, res: Response) => {
  const newData: ISignatures[] = req.body;
  const result = await addNewSignature(newData);
  return res.status(200).json(result);
});

export default router;
