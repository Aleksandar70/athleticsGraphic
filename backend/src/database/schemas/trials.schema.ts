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
  round: {
    type: Number,
    required: false,
    default: -1,
  },
});

export default TrialSchema;
