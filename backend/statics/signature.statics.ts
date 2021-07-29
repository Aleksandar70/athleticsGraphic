import type { ISignatureDocument } from "../src/database/types/signature.types";
import { SignatureModel } from "../src/models/signature.model";

//working
export async function createNewSignature(
  {
    name,
    title,
  }: { name: string; title: string }
): Promise<ISignatureDocument> {
  const signature = await SignatureModel.findOne({ name });
  console.log("found signature ", signature);
  if (signature) {
    return signature;
  } else {
    const newSig = SignatureModel.create({ name, title });
    console.log("newSig ", newSig);
    return newSig;
  }
}
//working
export async function getSignatures(): Promise<ISignatureDocument[]> {
  const signatures = await SignatureModel.find();
  console.log("signatures ", signatures);
    return signatures;
}