import type { Document, Model } from "mongoose";

export interface IEvent {
  competitionId: Record<string, unknown>;
  ageGroups: string[];
  cachedCount: number;
  category: string;
  ceScoreFormula: string;
  cutAfterRound: number;
  cutSurvivors: number;
  day: number;
  eventCode: string;
  eventId: string;
  genders: string;
  heatTimeCalculation: string;
  lanes: number;
  maxFieldAttempts: number;
  name: string;
  r1Time: string;
  r2Day: number;
  r3Day: number;
  reorderLastRound: boolean;
  requireCallroomOverride: boolean;
  rounds: string;
  seedingMethod: string;
  status: string;
  teamTypes: string;
  note: string;
}

export interface IEventDocument extends IEvent, Document {}
export interface IEventModel extends Model<IEventDocument> {
  createEvent: (competitionId, event) => Promise<IEventDocument>;
  getEvents: () => Promise<IEventDocument[]>;
  editEvent: (id, name, time, note) => Promise<IEventDocument[]>;
}
