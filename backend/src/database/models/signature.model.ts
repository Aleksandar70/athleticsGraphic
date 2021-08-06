import { model } from "mongoose";
import type {
  ISignatureDocument,
  ISignatureModel,
} from "../types/signature.types";
import SignatureSchema from "../schemas/signature.schema";

export const SignatureModel = model<ISignatureDocument>(
  "signature",
  SignatureSchema
) as ISignatureModel;
