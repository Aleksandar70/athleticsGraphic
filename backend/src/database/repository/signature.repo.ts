import type { ISignatureDocument } from "../types/signature.types";
import { SignatureModel } from "../models/signature.model";

export const createNewSignature = async ({
  name,
  title,
}: {
  name: string;
  title: string;
}): Promise<ISignatureDocument> => {
  const signature = await SignatureModel.findOne({ name });
  return signature ?? SignatureModel.create({ name, title });
};

export const getSignatures = async (): Promise<ISignatureDocument[]> => {
  return await SignatureModel.find();
};
