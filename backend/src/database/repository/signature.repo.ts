import { ISignatures } from "../interfaces";
import { SignatureModel } from "../models/signature.model";

export const createSignatures = async (): Promise<void> => {
  await SignatureModel.create({});
};

export const addNewSignature = async (
  signatures: ISignatures[]
): Promise<ISignatures[]> => {
  const signatureModels: ISignatures[] = [];

  for (const signature of signatures) {
    const signatureModel = new SignatureModel({
      ...signature,
    });
    signatureModels.push(signatureModel);
  }

  return await SignatureModel.insertMany(signatureModels);
};

export const getSignatures = async (): Promise<ISignatures[]> => {
  return await SignatureModel.find({});
};
