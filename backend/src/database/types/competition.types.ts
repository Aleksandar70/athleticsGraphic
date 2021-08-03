import type { Document, Model } from "mongoose";

export interface ICompetition {
  address: string;
  basicDescription: string;
  contactDetails: string;
  country: string;
  date: string;
  englishName: string;
  finishDate: string;
  fullName: string;
  latitude: string;
  longitude: string;
  organiser: string;
  resultsLink: string;
  scoringSystem: string;
  shortName: string;
  slug: string;
  teamTypes: string;
  type: string;
  year: number;
}

export interface ICompetitionDocument extends ICompetition, Document {}
export interface ICompetitionModel extends Model<ICompetitionDocument> {
  createCompetition: (competition) => Promise<ICompetitionDocument>;
  findCompetitionById: (
    competitionId: string
  ) => Promise<ICompetitionDocument[]>;
}
