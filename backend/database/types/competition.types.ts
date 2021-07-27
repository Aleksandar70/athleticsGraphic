import type { Document, Model } from "mongoose";

export interface ICompetition {
  address: String;
  basicDescription: String;
  contactDetails: String;
  country: String;
  date: String;
  englishName: String;
  finishDate: String;
  fullName: String;
  latitude: String;
  longitude: String;
  organiser: String;
  resultsLink: String;
  scoringSystem: String;
  shortName: String;
  slug: String;
  teamTypes: String;
  type: String;
  year: Number;
}

export interface ICompetitionDocument extends ICompetition, Document {}
export interface ICompetitionModel extends Model<ICompetitionDocument> {}
