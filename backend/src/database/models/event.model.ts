import { model } from "mongoose";
import EventSchema from "../schemas/event.schema";

export const EventModel = model("events", EventSchema);
