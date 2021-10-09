import { Schema } from "mongoose";

const SignatureSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: "",
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
});

export default SignatureSchema;
