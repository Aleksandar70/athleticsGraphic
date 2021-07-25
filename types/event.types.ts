import { Document, Model } from "mongoose";
  
export interface IEvent {
    name: string;
    title: string;
}
  
export interface IEventDocument extends IEvent, Document { }
export interface IEventModel extends Model<IEventDocument> { }