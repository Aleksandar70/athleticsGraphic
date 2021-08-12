import { Schema } from "mongoose";

const UnitSchema = new Schema({
  day: {
    type: Number,
    required: false,
    default: -1,
  },
  eventId: {
    type: String,
    required: false,
    default: "",
  },
  eventName: {
    type: String,
    required: false,
    default: "",
  },
  heat: {
    type: Number,
    required: false,
    default: -1,
  },
  heatName: {
    type: String,
    required: false,
    default: "",
  },
  heights: {
    type: Array,
    required: false,
    default: [],
  },
  initialHeight: {
    type: String,
    required: false,
    default: "",
  },
  overrideCeScores: {
    type: Boolean,
    required: false,
    default: false,
  },
  overridePlaces: {
    type: Boolean,
    required: false,
    default: false,
  },
  results: [{ type: Schema.Types.ObjectId, ref: "results" }],
  resultsStatus: {
    type: String,
    required: false,
    default: "",
  },
  round: {
    type: Number,
    required: false,
    default: -1,
  },
  scheduledStartTime: {
    type: String,
    required: false,
    default: "",
  },
  showAthleteDetails: {
    type: Boolean,
    required: false,
    default: false,
  },
  showPartials: {
    type: Boolean,
    required: false,
    default: false,
  },
  showPoints: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    required: false,
    default: "",
  },
  trials: [{ type: Schema.Types.ObjectId, ref: "trials" }],
});

export default UnitSchema;
