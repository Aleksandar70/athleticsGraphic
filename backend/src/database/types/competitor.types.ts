import type { Document, Model } from "mongoose";

export interface ICompetitor {
  competitionId: Record<string, unknown>;
  ageGroup: string;
  checkedIn: boolean;
  competitorId: string;
  dateOfBirth: string;
  event: string;
  firstName: string;
  flagUrl: string;
  gender: string;
  lastName: string;
  nonScorer: boolean;
  numbered: boolean;
  otAthleteId: string;
  sortAgeGroup: string;
  sortBib: number;
  teamId: string;
  teamName: string;
  pb: string;
  age: string;
}

export interface ICompetitorDocument extends ICompetitor, Document { }
export interface ICompetitorModel extends Model<ICompetitorDocument> {
  findCompetitorByBib: (bib: number) => Promise<ICompetitorDocument[]>;
}
