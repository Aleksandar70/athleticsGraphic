import { Document, Model } from "mongoose";

export interface ICompetitor {
    competitionId: Object,
    ageGroup: String,
    checkedIn: Boolean,
    competitorId: String,
    dateOfBirth: String,
    event: String,
    firstName: String,
    flagUrl: String,
    gender: String,
    lastName: String,
    nonScorer: Boolean,
    numbered: Boolean,
    otAthleteId: String,
    sortAgeGroup: String,
    sortBib: Number,
    teamId: String,
    teamName: String,
    pb: String,
    age: String,
}
  
export interface ICompetitorDocument extends ICompetitor, Document { }
export interface ICompetitorModel extends Model<ICompetitorDocument> { }