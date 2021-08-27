import { Schema } from "mongoose";

const TrialSchema = new Schema({
  bib: {
    type: String,
    required: false,
    default: "",
  },
  result: {
    type: String,
    required: false,
    default: "",
  },
  height: {
    type: String,
    required: false,
    default: "",
  },
  round: {
    type: Number,
    required: false,
  },
});

export default TrialSchema;
