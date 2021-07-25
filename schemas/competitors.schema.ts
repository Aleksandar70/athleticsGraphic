import mongoose from "mongoose";

const CompetitorSchema = new mongoose.Schema({
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

// const model = mongoose.model("Competitor", CompetitorSchema);

// async function createNewCompetitor(competition_id, competitor) {
//     const competitors = await model.find({ competitionId: competition_id, competitorId: competitor.competitorId }).exec();

//     if (competitors.length !== 0) {
//         return competitors[0];
//     } else {
//         let competitionId = competition_id;


//         let ageGroup = null;
//         let checkedIn = null;
//         let competitorId = null;
//         let dateOfBirth = null;
//         let event = null;
//         let firstName = null;
//         let flagUrl = null;
//         let gender = null;
//         let lastName = null;
//         let nonScorer = null;
//         let numbered = null;
//         let otAthleteId = null;
//         let sortAgeGroup = null;
//         let sortBib = null;
//         let teamId = null;
//         let teamName = null;
//         let pb = null;
//         let age = null;

//         ageGroup = competitor.ageGroup == null ? "" : competitor.ageGroup;
//         checkedIn = competitor.checkedIn == null ? false : competitor.checkedIn;
//         competitorId = competitor.competitorId == null ? "" : competitor.competitorId;
//         dateOfBirth = competitor.dateOfBirth == null ? "" : competitor.dateOfBirth;
//         event = competitor.event == null ? "" : competitor.event;
//         firstName = competitor.firstName == null ? "" : competitor.firstName;
//         flagUrl = competitor.flagUrl == null ? "" : competitor.flagUrl;
//         gender = competitor.gender == null ? "" : competitor.gender;
//         lastName = competitor.lastName == null ? "" : competitor.lastName;
//         nonScorer = competitor.nonScorer == null ? false : competitor.nonScorer;
//         numbered = competitor.numbered == null ? false : competitor.numbered;
//         otAthleteId = competitor.otAthleteId == null ? "" : competitor.otAthleteId;
//         sortAgeGroup = competitor.sortAgeGroup == null ? "" : competitor.sortAgeGroup;
//         sortBib = competitor.sortBib == null ? 0 : parseInt(competitor.sortBib);
//         teamId = competitor.teamId == null ? "" : competitor.teamId;
//         teamName = competitor.teamName == null ? "" : competitor.teamName;
//         pb = competitor.pb == null ? "" : competitor.pb;
//         age = competitor.dateOfBirth == null ? "" : (2021 - parseInt(competitor.dateOfBirth.substring(0, 4))) + "";

//         const newCompetitor = new model({
//             competitionId,
//             ageGroup,
//             checkedIn,
//             competitorId,
//             dateOfBirth,
//             event,
//             firstName,
//             flagUrl,
//             gender,
//             lastName,
//             nonScorer,
//             numbered,
//             otAthleteId,
//             sortAgeGroup,
//             sortBib,
//             teamId,
//             teamName,
//             pb,
//             age,
//         });
//         return await newCompetitor.save();
//     }
// }

// async function findByBib(bib) {
//     let competitors = await model.find({ sortBib: bib }).exec();

//     if (competitors.length !== 0) {
//         return competitors[0];
//     } else {
//         return null;
//     }
// }

// module.exports = {
//     createNewCompetitor,
//     findByBib,
// }

// export default CompetitorSchema;