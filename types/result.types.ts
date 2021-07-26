import { Document, Model } from "mongoose";

export interface IResult {
    competitorId: Object;
    day: Number;
    eventId: Number;
    eventName: Date;
    resultsStatus: Date;
    round: Number;
    rounds: String;
    roundName: String
    scheduledStartTime: String,
    showAthleteDetails: Boolean,
    showPartials: Boolean,
    showPoints: Boolean,
    status: String,
    unitCode: String,
    heat: Number,
    heatName: String,
    heights: Array<String>,
    bib: Number,
    athlonPoints:String,
    catpos: Number,
    order: Number,
    performance: String,
    place: Number,
    points: Number,
    startTime: String,
    finishTime: String,
    rawTime: String,
    reactionTime: String,
    round1: String,
    round2: String,
    round3: String,
    round4: String,
    round5: String,
    round6: String,
    height1: String,
    height2: String,
    height3: String,
    height4: String,
    height5: String,
    height6: String,
    height7: String,
    height8: String,
    height9: String,
    height10: String,
    height11: String,
    height12: String,
    height13: String,
    height14: String,
    height15: String,
    height16: String,
    height17: String,
    height18: String,
    height19: String,
    height20: String,
    result1: String,
    result2: String,
    result3: String,
    result4: String,
    result5: String,
    result6: String,
    result7: String,
    result8: String,
    result9: String,
    result10: String,
    result11: String,
    result12: String,
    result13: String,
    result14: String,
    result15: String,
    result16: String,
    result17: String,
    result18: String,
    result19: String,
    result20: String,
}
  
export interface IResultDocument extends IResult, Document { }
export interface IResultModel extends Model<IResultDocument> { }