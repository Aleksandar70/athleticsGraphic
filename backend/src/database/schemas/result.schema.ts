import { Schema } from "mongoose";
import { getResults, createResult, getResultsByEventId, getResultsByHeat } from "../../statics/result.statics";

const ResultSchema = new Schema({
  competitorId: {
    type: Object,
    required: true,
    ref: "Competitor",
  },
  day: {
    type: Number,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  resultsStatus: {
    type: String,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  rounds: {
    type: String,
    required: false,
  },
  roundName: {
    type: String,
    required: false,
  },
  scheduledStartTime: {
    type: String,
    required: false,
  },
  showAthleteDetails: {
    type: Boolean,
    required: true,
  },
  showPartials: {
    type: Boolean,
    required: true,
  },
  showPoints: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  unitCode: {
    type: String,
    required: false,
  },
  heat: {
    type: Number,
    required: false,
  },
  heatName: {
    type: String,
    required: false,
  },
  heights: {
    type: Array,
    required: false,
  },
  bib: {
    type: Number,
    required: true,
  },
  athlonPoints: {
    type: String,
    required: false,
  },
  catpos: {
    type: Number,
    required: false,
  },
  order: {
    type: Number,
    required: false,
  },
  performance: {
    type: String,
    required: false,
  },
  place: {
    type: Number,
    required: false,
  },
  points: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: false,
  },
  finishTime: {
    type: String,
    required: false,
  },
  rawTime: {
    type: String,
    required: false,
  },
  reactionTime: {
    type: String,
    required: false,
  },
  round1: {
    type: String,
    required: false,
  },
  round2: {
    type: String,
    required: false,
  },
  round3: {
    type: String,
    required: false,
  },
  round4: {
    type: String,
    required: false,
  },
  round5: {
    type: String,
    required: false,
  },
  round6: {
    type: String,
    required: false,
  },
  height1: {
    type: String,
    required: false,
    default: "",
  },
  height2: {
    type: String,
    required: false,
    default: "",
  },
  height3: {
    type: String,
    required: false,
    default: "",
  },
  height4: {
    type: String,
    required: false,
    default: "",
  },
  height5: {
    type: String,
    required: false,
    default: "",
  },
  height6: {
    type: String,
    required: false,
    default: "",
  },
  height7: {
    type: String,
    required: false,
    default: "",
  },
  height8: {
    type: String,
    required: false,
    default: "",
  },
  height9: {
    type: String,
    required: false,
    default: "",
  },
  height10: {
    type: String,
    required: false,
    default: "",
  },
  height11: {
    type: String,
    required: false,
    default: "",
  },
  height12: {
    type: String,
    required: false,
    default: "",
  },
  height13: {
    type: String,
    required: false,
    default: "",
  },
  height14: {
    type: String,
    required: false,
    default: "",
  },
  height15: {
    type: String,
    required: false,
    default: "",
  },
  height16: {
    type: String,
    required: false,
    default: "",
  },
  height17: {
    type: String,
    required: false,
    default: "",
  },
  height18: {
    type: String,
    required: false,
    default: "",
  },
  height19: {
    type: String,
    required: false,
    default: "",
  },
  height20: {
    type: String,
    required: false,
    default: "",
  },
  result1: {
    type: String,
    required: false,
    default: "",
  },
  result2: {
    type: String,
    required: false,
    default: "",
  },
  result3: {
    type: String,
    required: false,
    default: "",
  },
  result4: {
    type: String,
    required: false,
    default: "",
  },
  result5: {
    type: String,
    required: false,
    default: "",
  },
  result6: {
    type: String,
    required: false,
    default: "",
  },
  result7: {
    type: String,
    required: false,
    default: "",
  },
  result8: {
    type: String,
    required: false,
    default: "",
  },
  result9: {
    type: String,
    required: false,
    default: "",
  },
  result10: {
    type: String,
    required: false,
    default: "",
  },
  result11: {
    type: String,
    required: false,
    default: "",
  },
  result12: {
    type: String,
    required: false,
    default: "",
  },
  result13: {
    type: String,
    required: false,
    default: "",
  },
  result14: {
    type: String,
    required: false,
    default: "",
  },
  result15: {
    type: String,
    required: false,
    default: "",
  },
  result16: {
    type: String,
    required: false,
    default: "",
  },
  result17: {
    type: String,
    required: false,
    default: "",
  },
  result18: {
    type: String,
    required: false,
    default: "",
  },
  result19: {
    type: String,
    required: false,
    default: "",
  },
  result20: {
    type: String,
    required: false,
    default: "",
  },
});

ResultSchema.statics.createResult = createResult;
ResultSchema.statics.getResults = getResults;
ResultSchema.statics.getResultsByEventId = getResultsByEventId;
ResultSchema.statics.getResultsByHeat = getResultsByHeat;

export default ResultSchema;
