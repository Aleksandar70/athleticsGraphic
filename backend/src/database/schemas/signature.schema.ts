import { Schema } from "mongoose";

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

export default SignatureSchema;
