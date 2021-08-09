import { model } from "mongoose";
import type {
  IEventDocument,
  IEventModel,
} from "../types/event.types";
import EventSchema from "../schemas/event.schema";

export const EventModel = model<IEventDocument>(
  "events",
  EventSchema
) as IEventModel;
