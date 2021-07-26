import { Schema } from "mongoose";

const CompetitorSchema = new Schema({
    competitionId: {
        type: Object,
        required: true,
    },
    ageGroup: {
        type: String,
        required: false,
        default: "",
    },
    checkedIn: {
        type: Boolean,
        required: true,
        default: false,
    },
    competitorId: {
        type: String,
        required: true,
        default: "",
    },
    dateOfBirth: {
        type: String,
        required: false,
        default: "",
    },
    event: {
        type: String,
        required: false,
        default: "",
    },
    firstName: {
        type: String,
        required: true,
        default: "",
    },
    flagUrl: {
        type: String,
        required: false,
        default: "",
    },
    gender: {
        type: String,
        required: false,
        default: "",
    },
    lastName: {
        type: String,
        required: true,
        default: "",
    },
    nonScorer: {
        type: Boolean,
        required: false,
        default: false,
    },
    numbered: {
        type: Boolean,
        required: false,
        default: false,
    },
    otAthleteId: {
        type: String,
        required: false,
        default: "",
    },
    sortAgeGroup: {
        type: String,
        required: false,
        default: "",
    },
    sortBib: {
        type: Number,
        required: true,
    },
    teamId: {
        type: String,
        required: false,
    },
    teamName: {
        type: String,
        required: false,
        default: "",
    },
    pb: {
        type: String,
        required: false,
        default: "",
    },
    age: {
        type: String,
        required: false,
        default: "",
    },
});

export default CompetitorSchema;