import { Schema } from "mongoose";

const CompetitionSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  basicDescription: {
    type: String,
    required: false,
  },
  contactDetails: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
  date: {
    type: String,
    required: true,
    default: "",
  },
  englishName: {
    type: String,
    required: false,
  },
  finishDate: {
    type: String,
    required: true,
    default: "",
  },
  fullName: {
    type: String,
    required: true,
    default: "",
  },
  id: {
    type: String,
    required: true,
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
  resultsLink: {
    type: String,
    required: false,
  },
  scoringSystem: {
    type: String,
    required: false,
    default: "",
  },
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
  year: {
    type: Number,
    required: true,
    default: 2021,
  },
});

export default CompetitionSchema;
