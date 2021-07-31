import type { ISignatureDocument } from "../database/types/signature.types";
import { SignatureModel } from "../models/signature.model";

export async function createNewSignature(
  {
    name,
    title,
  }: { name: string; title: string }
): Promise<ISignatureDocument> {
  const signature = await SignatureModel.findOne({ name });
  return signature ?? SignatureModel.create({ name, title });
}

export async function getSignatures(): Promise<ISignatureDocument[]> {
  return await SignatureModel.find();
}
