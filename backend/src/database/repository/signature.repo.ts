import { ISignature } from "../interfaces";
import { SignatureModel } from "../models/signature.model";

export const createSignatures = async (
  signatures: ISignature[]
): Promise<ISignature[]> => {
  const signatureModels: ISignature[] = [];

  for (const signature of signatures) {
    const signatureModel = new SignatureModel({
      ...signature,
    });

    signatureModels.push(signatureModel);
  }

  return await SignatureModel.insertMany(signatureModels);
};
