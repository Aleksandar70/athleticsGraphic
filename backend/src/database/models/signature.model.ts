import { model } from "mongoose";
import SignatureSchema from "../schemas/signature.schema";

export const SignatureModel = model("signature", SignatureSchema);
