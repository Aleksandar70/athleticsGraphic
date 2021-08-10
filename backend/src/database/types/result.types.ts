import type { Document, Model } from "mongoose";
import type { IHorizontalResult, IRunningResult, IVerticalResult } from "../../../../global/interfaces";

export interface IResult {
  competitorId: Record<string, unknown>;
  day: number;
  eventId: number;
  eventName: Date;
  resultsStatus: Date;
  round: number;
  rounds: string;
  roundName: string;
  scheduledStartTime: string;
  showAthleteDetails: boolean;
  showPartials: boolean;
  showPoints: boolean;
  status: string;
  unitCode: string;
  heat: number;
  heatName: string;
  heights: string[];
  bib: number;
  athlonPoints: string;
  catpos: number;
  order: number;
  performance: string;
  place: number;
  points: number;
  startTime: string;
  finishTime: string;
  rawTime: string;
  reactionTime: string;
  round1: string;
  round2: string;
  round3: string;
  round4: string;
  round5: string;
  round6: string;
  height1: string;
  height2: string;
  height3: string;
  height4: string;
  height5: string;
  height6: string;
  height7: string;
  height8: string;
  height9: string;
  height10: string;
  height11: string;
  height12: string;
  height13: string;
  height14: string;
  height15: string;
  height16: string;
  height17: string;
  height18: string;
  height19: string;
  height20: string;
  result1: string;
  result2: string;
  result3: string;
  result4: string;
  result5: string;
  result6: string;
  result7: string;
  result8: string;
  result9: string;
  result10: string;
  result11: string;
  result12: string;
  result13: string;
  result14: string;
  result15: string;
  result16: string;
  result17: string;
  result18: string;
  result19: string;
  result20: string;
}

export interface IResultDocument extends IResult, Document {}
export interface IResultModel extends Model<IResultDocument> {
  createResult: (responseData, result, trials) => Promise<IResultDocument>;
  getResults: () => Promise<IResultDocument[]>;
  getResultsByEventId: (eventId: string) => Promise<IResultDocument[]>;
  getResultsByHeat: (
    eventId,
    heat,
    round,
    order?
  ) => Promise<IResultDocument[]>;
  updateRunningResult: (results: IRunningResult) => Promise<IResultDocument>;
  semiOverwriteResult: (
    responseData,
    result,
    trials
  ) => Promise<IResultDocument>;
  updateHorizontalResult: (
    results: IHorizontalResult
  ) => Promise<IResultDocument>;
  updateVerticalResult: (results: IVerticalResult) => Promise<IResultDocument>;
}
