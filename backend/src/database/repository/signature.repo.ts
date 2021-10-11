import { ISignature } from "../interfaces";
import { SignatureModel } from "../models/signature.model";

export const createSignatures = async (): Promise<void> => {
  await SignatureModel.create({});
};

export const addNewSignature = async (
  signature: ISignature
): Promise<ISignature> => await SignatureModel.create(signature);

export const getSignatures = async (): Promise<ISignature[]> => {
  return await SignatureModel.find({});
};
