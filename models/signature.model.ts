import { model } from "mongoose";
import { ISignatureDocument } from "./signature.types";
import SignatureSchema from "../schemas/signature.schema";
  
export const SignatureModel = model<ISignatureDocument>("signature", SignatureSchema);