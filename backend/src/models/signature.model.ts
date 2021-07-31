import { model } from "mongoose";
import type { ISignatureDocument, ISignatureModel } from "../database/types/signature.types";
import SignatureSchema from "../database/schemas/signature.schema";

export const SignatureModel = model<ISignatureDocument>(
  "signature",
  SignatureSchema
) as ISignatureModel;
