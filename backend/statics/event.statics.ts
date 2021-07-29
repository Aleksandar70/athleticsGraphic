import type { IEventDocument, IEventModel } from "../src/database/types/event.types";

export async function createEvent(this: IEventModel, competition_id, event): Promise<IEventDocument> {
    const events = await this.find({ competitionId: competition_id, eventCode: event.eventCode, eventId: event.eventId }).exec();

    if (events.length !== 0) {
        return events[0];
    }

    return this.create({ competition_id });
}

export async function getEvents(this: IEventModel): Promise<IEventDocument[]> {
    return this.find({});
}

export async function editEvent(this: IEventModel, id, name, time, note) {
    const event = await this.findById(id).exec();
    event.name = name;
    event.r1Time = time;
    event.note = note;

    return await event.save();
}
