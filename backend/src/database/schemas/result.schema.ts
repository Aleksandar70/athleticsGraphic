import { Schema } from "mongoose";

const ResultSchema = new Schema({
  bib: {
    type: String,
    required: false,
    default: "",
  },
  catpos: {
    type: Number,
    required: false,
  },
  order: {
    type: Number,
    required: false,
  },
  lane: {
    type: Number,
    required: false,
  },
  performance: {
    type: String,
    required: false,
    default: "",
  },
  place: {
    type: Number,
    required: false,
  },
  points: {
    type: Number,
    required: false,
  },
  rawTime: {
    type: String,
    required: false,
    default: "",
  },
  heatName: {
    type: String,
    required: false,
    default: "single",
  },
});

export default ResultSchema;
