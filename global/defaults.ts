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
  "place",
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
  "place",
  "competitorId",
  "firstName",
  "lastName",
  "dateOfBirth",
  "nationality",
  "pb",
  "sb",
  "flagUrl",
  "teamName",
  "result",
];

export const eventRelayTeamsColumnsUI = [
  "place",
  "teamId",
  "name",
  "result",
  "runners",
];

export const defaultEventRelayTeamsColumns = [
  "place",
  "teamId",
  "result",
  "runners",
];

export const uneditableFields = [
  "competitorId",
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
