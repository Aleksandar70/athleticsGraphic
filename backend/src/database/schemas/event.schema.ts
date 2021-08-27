import { Schema } from "mongoose";

const EventSchema = new Schema({
  ageGroups: {
    type: Array,
    required: false,
    default: [],
  },
  cachedCount: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
    default: "",
  },
  ceScoreFormula: {
    type: String,
    required: false,
    default: "",
  },
  cutAfterRound: {
    type: Number,
    required: false,
  },
  cutSurvivors: {
    type: Number,
    required: false,
  },
  day: {
    type: Number,
    required: false,
  },
  eventCode: {
    type: String,
    required: false,
    default: "",
  },
  eventId: {
    type: String,
    required: false,
    default: "",
  },
  genders: {
    type: String,
    required: false,
    default: "",
  },
  heatTimeCalculation: {
    type: String,
    required: false,
    default: "",
  },
  lanePrefs: {
    type: String,
    required: false,
    default: "",
  },
  lanes: {
    type: Number,
    required: false,
  },
  maxFieldAttempts: {
    type: Number,
    required: false,
  },
  maxPerHeat: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  r1Time: {
    type: String,
    required: false,
    default: "",
  },
  r2Day: {
    type: Number,
    required: false,
  },
  r3Day: {
    type: Number,
    required: false,
  },
  reorderLastRound: {
    type: Boolean,
    required: false,
    default: false,
  },
  requireCallroomOverride: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounds: {
    type: String,
    required: false,
    default: "",
  },
  seedingMethod: {
    type: String,
    required: false,
    default: "",
  },
  showFormGuide: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    required: false,
    default: "",
  },
  teamTypes: {
    type: String,
    required: false,
    default: "",
  },
  units: [{ type: Schema.Types.ObjectId, ref: "units" }],
});

export default EventSchema;
