import { Schema } from "mongoose";
import { getSignatures, createNewSignature } from "../../../statics/signature.statics";

const SignatureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

SignatureSchema.statics.createNewSignature = createNewSignature;
SignatureSchema.statics.getSignatures = getSignatures;

export default SignatureSchema;
