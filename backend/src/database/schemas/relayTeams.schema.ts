import { Schema } from "mongoose";

const RelayTeamsSchema = new Schema({
  eventId: {
    type: String,
    required: false,
    default: "",
  },
  nonScorer: {
    type: Boolean,
    required: false,
    default: false,
  },
  relayTeamId: {
    type: String,
    required: false,
  },
  teamId: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  runners: {
    type: Array,
    required: false,
    default: [],
  },
});

export default RelayTeamsSchema;
