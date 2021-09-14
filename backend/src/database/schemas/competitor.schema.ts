import { Schema } from "mongoose";

const CompetitorSchema = new Schema({
  competitorId: {
    type: String,
    required: false,
    default: "",
  },
  nationalId: {
    type: String,
    required: false,
    default: "",
  },
  firstName: {
    type: String,
    required: false,
    default: "",
  },
  lastName: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: false,
    default: "",
  },
  dateOfBirth: {
    type: String,
    required: false,
    default: "",
  },
  teamId: {
    type: String,
    required: false,
    default: "",
  },
  nonScorer: {
    type: Boolean,
    required: false,
    default: false,
  },
  eventsEntered: [{ type: Schema.Types.ObjectId, ref: "events" }],
  numbered: {
    type: Boolean,
    required: false,
    default: false,
  },
  sortEventCode: {
    type: String,
    required: false,
    default: "",
  },
  sortBib: {
    type: String,
    required: false,
    default: "",
  },
  sortAgeGroup: {
    type: String,
    required: false,
    default: "",
  },
  checkedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
  nationality: {
    type: String,
    required: false,
    default: "",
  },
  // notablePerformances
  event: {
    type: String,
    required: false,
    default: "",
  },
  pb: {
    type: String,
    required: false,
    default: "",
  },
  sb: {
    type: String,
    required: false,
    default: "",
  },
  // eventEntered
  flagUrl: {
    type: String,
    required: false,
    default: "",
  },
  teamName: {
    type: String,
    required: false,
    default: "",
  },
});

export default CompetitorSchema;
