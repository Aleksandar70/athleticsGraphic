import { model } from "mongoose";
import { IEventDocument } from "../types/event.types";
import EventsSchema from "../schemas/events.schema";
  
export const EventModel = model<IEventDocument>("event", EventsSchema);