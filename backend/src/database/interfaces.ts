import type { ObjectId } from "mongoose";

export interface IOTCompetitionData {
  competitionData: ICompetition;
  competitorsData: ICompetitor[];
  eventsData: IEvent[];
  relayTeamsData: IRelayTeams[];
}

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
  rounds?: number;
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
  unitCode?: string;
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
  bib: string;
  competitorId?: string;
  result?: string;
  height?: string;
  round?: number;
}

export interface ICompetitor {
  _id?: ObjectId;
  competitorId?: string;
  nationalId?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  teamId?: string;
  nonScorer?: boolean;
  numbered?: boolean;
  sortEventCode?: string;
  sortBib?: string;
  sortAgeGroup?: string;
  checkedIn?: boolean;
  nationality?: string;
  event?: string;
  eventsEntered?: IEvent[];
  pb?: string;
  sb?: string;
  flagUrl?: string;
  teamName?: string;
}

export interface IRelayTeams {
  _id?: ObjectId;
  eventId?: string;
  name: string;
  nonScorer: false;
  relayTeamId: string;
  teamId: string;
  runners: ICompetitor[];
}

export interface ICompetition {
  _id?: ObjectId;
  address?: string;
  city?: string;
  contactDetails?: string;
  country?: string;
  date?: string;
  competitors?: ICompetitor[];
  englishName?: string;
  finishDate?: string;
  fullName?: string;
  id?: string;
  latitude?: number;
  longitude?: number;
  organiser?: string;
  relayTeams?: IRelayTeams[];
  shortName?: string;
  slug?: string;
  teamTypes?: string;
  type?: string;
  website?: string;
  year?: number;
  events?: IEvent[];
}

export interface IConfig {
  _id?: ObjectId;
  dataSource?: string;
}
