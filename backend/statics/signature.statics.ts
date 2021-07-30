import type { ISignatureDocument } from "../src/database/types/signature.types";
import { SignatureModel } from "../src/models/signature.model";

export async function createNewSignature(
  {
    name,
    title,
  }: { name: string; title: string }
): Promise<ISignatureDocument> {
  const signature = await SignatureModel.findOne({ name });
  if (signature) {
    return signature;
  } else {
    return SignatureModel.create({ name, title });
  }
}

export async function getSignatures(): Promise<ISignatureDocument[]> {
  return await SignatureModel.find();
}