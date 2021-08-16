import { Schema } from "mongoose";

const CompetitionSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  contactDetails: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
    default: "",
  },
  date: {
    type: String,
    required: false,
    default: "",
  },
  englishName: {
    type: String,
    required: false,
  },
  // events
  finishDate: {
    type: String,
    required: false,
    default: "",
  },
  fullName: {
    type: String,
    required: false,
    default: "",
  },
  id: {
    type: String,
    required: false,
    default: "",
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  organiser: {
    type: String,
    required: false,
    default: "",
  },
  // relayTeams
  shortName: {
    type: String,
    required: false,
    default: "",
  },
  slug: {
    type: String,
    required: false,
    default: "",
  },
  teamTypes: {
    type: String,
    required: false,
    default: "",
  },
  type: {
    type: String,
    required: false,
    default: "",
  },
  // venue
  website: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: false,
    default: 2021,
  },
});

export default CompetitionSchema;
