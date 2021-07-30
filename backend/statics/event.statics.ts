import type { IEventDocument } from "../src/database/types/event.types";
import { EventModel } from "../src/models/event.model";

//working
export async function createEvent(competition_id, event): Promise<IEventDocument> {
    const events = await EventModel.find({ competitionId: competition_id, eventCode: event.eventCode, eventId: event.eventId }).exec();
    if (events.length !== 0) {
        return events[0];
    }
    let competitionId = competition_id;
    let ageGroups = event.ageGroups == null ? [] : event.ageGroups;
    let category = event.category == null ? "" : event.category;
    let day = event.day == null ? 0 : event.day;
    let eventCode = event.eventCode == null ? "" : event.eventCode;
    let eventId = event.eventId == null ? "" : event.eventId;
    let genders = event.genders == null ? "" : event.genders;
    let name = event.name == null ? "" : event.name;
    let r1Time = event.r1Time == null ? "" : event.r1Time;

    const newEvent = EventModel.create({
        competitionId,
        ageGroups,
        category,
        day,
        eventCode,
        eventId,
        genders,
        name,
        r1Time,
    });
    return newEvent;
}

//working
export async function getEvents(): Promise<IEventDocument[]> {
    return await EventModel.find({});
}

//working
export async function editEvent(id, name, time, note) {
    const event = await EventModel.findById(id).exec();
    if (event != null) {
        event.name = name;
        event.r1Time = time;
        event.note = note;
        return await event.save();
    }
    return null;
}
