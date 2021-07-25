import { Document, Model } from "mongoose";
  
export interface ICompetitor {
    firstName: string;
    lastName: string;
    age: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
    gender: String;
    department: String;
}
  
export interface ICompetitorDocument extends ICompetitor, Document { }
export interface ICompetitorModel extends Model<ICompetitorDocument> { }