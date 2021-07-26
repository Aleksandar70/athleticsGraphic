import { Document, Model } from "mongoose";

export interface ISignature {
    name: string;
    title: string;
}
  
export interface ISignatureDocument extends ISignature, Document { }
export interface ISignatureModel extends Model<ISignatureDocument> { }