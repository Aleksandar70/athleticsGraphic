import { ObjectId } from "mongoose";

export interface IEvent {
  _id?: ObjectId;
  ageGroups?: string[];
  cachedCount?: number;
  category?: string;
  ceScoreFormula?: string;
  cutAfterRound?: number;
  cutSurvivors?: number;
  day?: number;
  eventCode?: string;
  eventId?: string;
  genders?: string;
  heatTimeCalculation?: string;
  lanePrefs?: string;
  lanes?: number;
  maxFieldAttempts?: number;
  maxPerHeat?: number;
  name?: string;
  r1Time?: string;
  r2Day?: number;
  r3Day?: number;
  reorderLastRound?: boolean;
  requireCallroomOverride?: boolean;
  rounds?: string;
  seedingMethod?: string;
  showFormGuide?: boolean;
  status?: string;
  teamTypes?: string;
  units?: IUnit[];
}

export interface IUnit {
  _id?: ObjectId;
  day?: number;
  distance?: number;
  eventId?: string;
  eventName?: string;
  heat?: number;
  heatName?: string;
  heights?: string[];
  initialHeight?: string;
  overrideCeScores?: boolean;
  overridePlaces?: boolean;
  precision?: number;
  results?: IResult[];
  resultsStatus?: string;
  round?: number;
  scheduledStartTime?: string;
  showAthleteDetails?: boolean;
  showHandicap?: boolean;
  showPartials?: boolean;
  showPoints?: boolean;
  showRawTime?: boolean;
  showReactionTime?: boolean;
  splitsLap?: number;
  splitsStart?: number;
  status?: string;
  trials?: ITrial[];
}

export interface IResult {
  _id?: ObjectId;
  bib?: string;
  catpos?: number;
  order?: number;
  lane?: number;
  performance?: string;
  place?: number;
  points?: number;
  rawTime?: string;
}
export interface ITrial {
  _id?: ObjectId;
  bib?: string;
  result?: string;
  height?: string;
  round?: number;
}
