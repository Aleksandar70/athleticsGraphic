import type { Document, Model } from "mongoose";

export interface ISignature {
  name: string;
  title: string;
}

export interface ISignatureDocument extends ISignature, Document {}
export interface ISignatureModel extends Model<ISignatureDocument> {
  createNewSignature: (
    this: ISignatureModel,
    {
      name,
      title,
    }: { name: string; title: string}
  ) => Promise<ISignatureDocument>;
  getSignatures: () => Promise<ISignatureDocument[]>;
}
