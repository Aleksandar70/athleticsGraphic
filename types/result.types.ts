import { Document, Model } from "mongoose";
  
export interface IResult {
    firstName: string;
    lastName: string;
    age: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
    gender: String;
    department: String;
}
  
export interface IResultDocument extends IResult, Document { }
export interface IResultModel extends Model<IResultDocument> { }