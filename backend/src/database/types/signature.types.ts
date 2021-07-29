import type { Document, Model } from "mongoose";

export interface ISignature {
  name: string;
  title: string;
}

export interface ISignatureDocument extends ISignature, Document {}
export type ISignatureModel = Model<ISignatureDocument>;
