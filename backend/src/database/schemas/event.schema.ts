import { Schema } from "mongoose";
import { createEvent, getEvents, editEvent } from "../../../statics/event.statics";

const EventSchema = new Schema({
  competitionId: {
    type: Object,
    required: true,
  },
  ageGroups: {
    type: Array,
    required: true,
    default: [],
  },
  cachedCount: {
    type: Number,
    required: false,
    default: 0,
  },
  category: {
    type: String,
    required: true,
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
    default: 0,
  },
  cutSurvivors: {
    type: Number,
    required: false,
    default: 0,
  },
  day: {
    type: Number,
    required: true,
    default: 0,
  },
  eventCode: {
    type: String,
    required: true,
    default: "",
  },
  eventId: {
    type: String,
    required: true,
    default: "",
  },
  genders: {
    type: String,
    required: true,
    default: "",
  },
  heatTimeCalculation: {
    type: String,
    required: false,
    default: "",
  },
  lanes: {
    type: Number,
    required: false,
    default: 0,
  },
  maxFieldAttempts: {
    type: Number,
    required: false,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  r1Time: {
    type: String,
    required: true,
    default: "",
  },
  r2Day: {
    type: Number,
    required: false,
    default: 0,
  },
  r3Day: {
    type: Number,
    required: false,
    default: 0,
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
  note: {
    type: String,
    required: false,
    default: "",
  },
});

EventSchema.statics.createEvent = createEvent;
EventSchema.statics.getEvents = getEvents;
EventSchema.statics.editEvent = editEvent;

export default EventSchema;
