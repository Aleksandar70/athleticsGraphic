import { getOTCompetitionData } from "../api/opentrack.api";
import { ICompetition, IEvent } from "../database/interfaces";
import fs from "fs";
import { Regex } from "../../../global/constants/constants";
import {
  getLocaleFileNames,
  updateConfig,
} from "../database/repository/config.repo";

export const createDefaultLocale = async () => {
  const defaultLocale = {};

  let localeJsonCreated = false;

  const slash = process.platform === "darwin" ? "/" : "\\";
  const pathToDefaultLocale = process
    .cwd()
    .replace(Regex.AFTER_LAST_SLASH, `i18n${slash}default.json`);

  try {
    const localeJson = await import(pathToDefaultLocale);
    localeJsonCreated = Object.keys(localeJson).length > 1;
  } catch (error) {
    localeJsonCreated = false;
  }

  if (localeJsonCreated) {
    const currentLocales = getLocaleFileNames();
    await updateConfig({ languages: currentLocales });
    return;
  }

  const { competitionData, eventsData } = await getOTCompetitionData();
  createDefaultCompetitionLocale(defaultLocale, competitionData);
  createDefaulteventLocale(defaultLocale, eventsData);
  createDefaultUnitsLocale(defaultLocale, eventsData);
  delete defaultLocale["default"];
  fs.writeFileSync(pathToDefaultLocale, JSON.stringify(defaultLocale));
};

const createDefaultCompetitionLocale = (
  locale: Record<string, string>,
  data: ICompetition
) => {
  for (const [key, value] of Object.entries(data)) {
    if (
      typeof value === "string" &&
      value.toString().match(Regex.FIND_WORDS)?.[0]
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
    if (event?.name?.match(Regex.FIND_WORDS)?.[0]) {
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
          value.toString().match(Regex.FIND_WORDS)?.[0]
        ) {
          if (!locale[`${key}_${event.eventId}`]) {
            locale[`${key}_${event.eventId}`] = value;
          }
        }
      }
    }
  }
};
