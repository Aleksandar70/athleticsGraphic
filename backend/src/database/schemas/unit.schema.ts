import { Schema } from "mongoose";

const UnitSchema = new Schema({
  day: {
    type: Number,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
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
  precision: {
    type: Number,
    required: false,
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
  },
  rounds: {
    type: Number,
    required: false,
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
  showHandicap: {
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
  showRawTime: {
    type: Boolean,
    required: false,
    default: false,
  },
  showReactionTime: {
    type: Boolean,
    required: false,
    default: false,
  },
  splitsLap: {
    type: Number,
    required: false,
  },
  splitsStart: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "",
  },
  unitCode: {
    type: String,
    required: false,
    default: "1",
  },
  trials: [{ type: Schema.Types.ObjectId, ref: "trials" }],
});

export default UnitSchema;
