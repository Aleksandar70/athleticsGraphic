import { Document, Model } from "mongoose";

export interface IEvent {
    competitionId: Object,
    ageGroups: Array<String>,
    cachedCount: Number,
    category: String,
    ceScoreFormula: String,
    cutAfterRound: Number,
    cutSurvivors: Number,
    day: Number,
    eventCode: String,
    eventId: String,
    genders: String,
    heatTimeCalculation: String,
    lanes: Number,
    maxFieldAttempts: Number,
    name: String,
    r1Time: String,
    r2Day: Number,
    r3Day: Number,
    reorderLastRound: Boolean,
    requireCallroomOverride: Boolean,
    rounds: String,
    seedingMethod: String,
    status: String,
    teamTypes: String,
    note: String,
}
  
export interface IEventDocument extends IEvent, Document { }
export interface IEventModel extends Model<IEventDocument> { }