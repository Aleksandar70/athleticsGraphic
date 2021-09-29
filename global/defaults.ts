export const defaultEventColumns = [
  "eventId",
  "name",
  "genders",
  "status",
  "r1Time",
];

export const eventColumnsUI = [
  "ageGroups",
  "category",
  "eventId",
  "genders",
  "lanePrefs",
  "name",
  "r1Time",
  "rounds",
  "status",
  "day",
  "lanes",
  "maxFieldAttempts",
  "r2Day",
  "r3Day",
];

export const defaultEventCompetitorsColumns = [
  "competitorId",
  "firstName",
  "lastName",
  "flagUrl",
  "nationality",
  "pb",
  "sb",
  "result",
];

export const eventCompetitorsColumnsUI = [
  "competitorId",
  "firstName",
  "lastName",
  "dateOfBirth",
  "nationality",
  "event",
  "pb",
  "sb",
  "flagUrl",
  "teamName",
  "result",
];

export const eventRelayTeamsColumnsUI = ["teamId", "name", "result", "runners"];

export const defaultEventRelayTeamsColumns = ["teamId", "result", "runners"];

export const uneditableFields = [
  "competitorId",
  "event",
  "eventId",
  "relayTeamId",
  "teamId",
  "flagUrl",
  "name",
  "status",
];

export const allEditableFields = [
  ...eventColumnsUI,
  ...eventCompetitorsColumnsUI,
].filter((value: string) => !uneditableFields.includes(value));
