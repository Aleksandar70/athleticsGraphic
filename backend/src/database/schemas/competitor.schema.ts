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
  },
  nonScorer: {
    type: Boolean,
    required: false,
    default: false,
  },
  // eventsEntered
  numbered: {
    type: Boolean,
    required: false,
    default: false,
  },
  sortEventCode: {
    type: String,
    required: false,
  },
  sortBib: {
    type: String,
    required: false,
  },
  sortAgeGroup: {
    type: String,
    required: false,
  },
  checkedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  // notablePerformances
  event: {
    type: String,
    required: false,
  },
  pb: {
    type: String,
    required: false,
  },
  sb: {
    type: String,
    required: false,
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
