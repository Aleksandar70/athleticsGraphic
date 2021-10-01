import { getOTCompetitionData } from "./api/opentrack.api";
import { ICompetition, IEvent } from "./database/interfaces";
import fs from "fs";

export const createDefaultLocale = async () => {
  const defaultLocale = {};

  let localeJsonCreated = false;
  const pathToDefaultLocale = process
    .cwd()
    .replace(/([^\\]+$)/g, "i18n\\default.json");

  try {
    const localeJson = await import(pathToDefaultLocale);
    localeJsonCreated = Object.keys(localeJson).length > 1;
  } catch (error) {
    localeJsonCreated = false;
  }

  if (localeJsonCreated) return;

  const { competitionData, eventsData } = await getOTCompetitionData();
  createDefaultCompetitionLocale(defaultLocale, competitionData);
  createDefaulteventLocale(defaultLocale, eventsData);
  createDefaultUnitsLocale(defaultLocale, eventsData);
  fs.writeFileSync(pathToDefaultLocale, JSON.stringify(defaultLocale));
};

const createDefaultCompetitionLocale = (
  locale: Record<string, string>,
  data: ICompetition
) => {
  for (const [key, value] of Object.entries(data)) {
    if (
      typeof value === "string" &&
      value.toString().match(/\b.*[a-zA-Z]{3,}.*\b/)?.[0]
    ) {
      locale[key] = value;
    }
  }
};

const createDefaulteventLocale = (
  locale: Record<string, string>,
  data: IEvent[]
) => {
  for (const event of data) {
    if (event?.name?.match(/\b.*[a-zA-Z]{3,}.*\b/)?.[0]) {
      locale[`name_${event.eventId}`] = event.name;
    }
  }
};

const createDefaultUnitsLocale = (
  locale: Record<string, string>,
  data: IEvent[]
) => {
  for (const event of data) {
    const units = event.units ?? [];
    for (const unit of units) {
      for (const [key, value] of Object.entries(unit)) {
        if (
          typeof value === "string" &&
          !key.toLowerCase().includes("status") &&
          value.toString().match(/\b.*[a-zA-Z]{3,}.*\b/)?.[0]
        ) {
          if (!locale[`${key}_${event.eventId}`]) {
            locale[`${key}_${event.eventId}`] = value;
          }
        }
      }
    }
  }
};
