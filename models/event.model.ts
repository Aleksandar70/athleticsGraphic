import { model } from "mongoose";
import { IEventDocument } from "../types/event.types";
import EventSchema from "../schemas/event.schema";
  
export const EventModel = model<IEventDocument>("event", EventSchema);