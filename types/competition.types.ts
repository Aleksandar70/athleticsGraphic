import { Document, Model } from "mongoose";
  
export interface ICompetition {
    firstName: string;
    lastName: string;
    age: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
    gender: String;
    department: String;
}
  
export interface ICompetitonDocument extends ICompetition, Document { }
export interface ICompetitionModel extends Model<ICompetitonDocument> { }