import { Schema } from "mongoose";

const ResultSchema = new Schema({
  place: {
    type: Number,
    required: false,
  },
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
  eventId: {
    type: String,
    required: false,
    default: "",
  },
});

export default ResultSchema;
