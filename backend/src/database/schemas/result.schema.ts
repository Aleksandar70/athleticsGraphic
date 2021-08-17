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
    default: -1,
  },
  order: {
    type: Number,
    required: false,
    default: -1,
  },
  lane: {
    type: Number,
    required: false,
    default: -1,
  },
  performance: {
    type: String,
    required: false,
    default: "",
  },
  place: {
    type: Number,
    required: false,
    default: -1,
  },
  points: {
    type: Number,
    required: false,
    default: -1,
  },
  rawTime: {
    type: String,
    required: false,
    default: "",
  },
});

export default ResultSchema;
