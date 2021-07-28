import { model } from "mongoose";
import type { IEventDocument } from "../database/types/event.types";
import EventSchema from "../database/schemas/event.schema";

export const EventModel = model<IEventDocument>("event", EventSchema);
