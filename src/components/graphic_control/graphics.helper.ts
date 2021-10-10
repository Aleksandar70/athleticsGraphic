import { get } from "svelte/store";
import type {
  ICompetitor,
  IResult,
} from "../../../backend/src/database/interfaces";
import { Graphics } from "../../../global/constants/constants";
import type { TableData, TableField } from "../../../global/types";
import {
  competitors,
  currentCompetitionData,
  currentEventData,
  currentHeatName,
  heatTableParticipants,
  selectedParticipant,
} from "../../stores/table.store";
import { isNumeric } from "../../utils/string.utils";
import { _ } from "svelte-i18n";

export const getDataForPreviewModal = (
  id: Graphics
): Record<string, string> => {
  const data = {};
  switch (id) {
    case Graphics.EVENT_ANNOUNCEMENT:
      data["Event Name"] = getValueFromTranslation(
        get(currentCompetitionData)["englishName"]
      );
      data["Location"] = "BELGRADE, FEBRUARY 2021";
      data["Hashtag"] = "#belgrade2021";
      break;
    case Graphics.PERSONAL_SCORE:
      data["Event Name"] = getValueFromTranslation(
        get(currentEventData)["name"]
      );
      if (heatExists()) {
        data["Heat"] = getHeatName();
      }
      data["ID"] = getFieldValueFromParticipant("competitorId");
      data["First Name"] = getFieldValueFromParticipant("firstName");
      data["Last Name"] = getFieldValueFromParticipant("lastName");
      data["Flag"] = getFieldValueFromParticipant("nationality");
      data["Nationality"] = getFieldValueFromParticipant("nationality");
      get(selectedParticipant).filter((field) => isNumeric(field.id)).length
        ? (data["Scores"] = getScores())
        : (data["Result"] = getFieldValueFromParticipant("result"));
      break;
    case Graphics.START_LIST:
      data["Competition"] = getValueFromTranslation(
        get(currentCompetitionData)["englishName"]
      );
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = getValueFromTranslation(
        get(currentEventData)["name"]
      );
      if (heatExists()) {
        data["Heat"] = getHeatName();
      }
      data["Description"] = "STARTING LIST";
      data["Competitors"] = getCompetitors();
      break;
    case Graphics.RESULT_LIST:
      data["Competition"] = getValueFromTranslation(
        get(currentCompetitionData)["englishName"]
      );
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = getValueFromTranslation(
        get(currentEventData)["name"]
      );
      if (heatExists()) {
        data["Heat"] = getHeatName();
      }
      data["Description"] = "RESULTS";
      data["Competitors"] = getCompetitors();
      break;
    case Graphics.DISCIPLINE_ANNOUNCEMENT:
      data["Discipline Name"] = getValueFromTranslation(
        get(currentEventData)["name"]
      );
      if (heatExists()) {
        data["Heat"] = getHeatName();
      }
      data["Note"] = "NEXT";
      data["Time"] = getValueFromTranslation(get(currentEventData)["r1Time"]);
      break;
    case Graphics.MEDALS:
      data["Competition"] = getValueFromTranslation(
        get(currentCompetitionData)["englishName"]
      );
      data["Event Name"] = getValueFromTranslation(
        get(currentEventData)["name"]
      );
      data["Hashtag"] = "#belgrade2021";
      data["Description"] = "MEDALS";
      data["Medals"] = getBestPlaces();
      break;
    case Graphics.PERSONAL_DATA:
      data["ID"] = getFieldValueFromParticipant("competitorId");
      data["Flag"] = getFieldValueFromParticipant("nationality");
      data["Nationality"] = getFieldValueFromParticipant("nationality");
      data["First Name"] = getFieldValueFromParticipant("firstName");
      data["Last Name"] = getFieldValueFromParticipant("lastName");
      data["Age"] = getCompetitorAge("dateOfBirth");
      data["Personal Best"] = getFieldValueFromParticipant("pb");
      data["Season Best"] = getFieldValueFromParticipant("sb");
      break;
    case Graphics.SIGNATURE:
      data["Name"] = "Name";
      data["Title"] = "Title";
  }
  return data;
};

const transformCompetitor = (
  competitorList: TableData
): Record<string, string>[] =>
  competitorList.map((competitorData) => {
    const competitors = {};
    competitorData.forEach((data: TableField) => {
      competitors[data.id] = data?.value;
    });
    return competitors;
  });

const getFieldValueFromParticipant = (key: string): string => {
  const participant = get(selectedParticipant).find(
    (field) => field.id === key
  );
  return participant?.value[get(currentHeatName)] ?? participant?.stringValue;
};

const getValueFromTranslation = (key: string): string => get(_)(key);

const getCompetitors = (list?: ICompetitor[]): Record<string, string>[] => {
  let competitorList: ICompetitor[];
  if (heatExists()) {
    competitorList = list
      ? list
      : transformCompetitor(get(heatTableParticipants));
  } else {
    competitorList = list ? list : get(competitors);
    sortCompetitorsByPlace(competitorList);
  }

  return competitorList.map((competitor: ICompetitor) => ({
    name: `${competitor.firstName} ${competitor.lastName}`,
    nationality: competitor.nationality,
    place: competitor.place,
    result: competitor.result,
  }));
};

const getCompetitorAge = (key: string) => {
  const birthDate = new Date(getFieldValueFromParticipant(key));
  const timeDiff = Math.abs(Date.now() - birthDate.getTime());
  const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  return age;
};

const getScores = (): unknown[] =>
  get(selectedParticipant)
    .filter((field) => isNumeric(field.id))
    .map((score: TableField) => ({ [score.id]: score.stringValue }));

const getBestPlaces = (): Record<string, string>[] => {
  const units = get(currentEventData)["units"];
  let bestResults = [];
  for (const unit of units) {
    bestResults = unit["results"].filter(
      (result: IResult) => result.place <= 3
    );
  }
  const resultBibsForMedals = bestResults.map((bestResult) => bestResult?.bib);

  const filteredBestCompetitors = get(competitors).filter((competitor) =>
    resultBibsForMedals.includes(competitor.competitorId)
  );
  const bestCompetitors = getCompetitors(filteredBestCompetitors);
  sortCompetitorsByPlace(bestCompetitors);
  return bestCompetitors;
};

const sortCompetitorsByPlace = (
  competitors: Record<string, string>[] | ICompetitor[]
): void => {
  competitors.sort((n1: ICompetitor, n2: ICompetitor) => {
    let place1 =
      n1?.place?.[get(currentHeatName)] ??
      n1?.place?.["Final"] ??
      n1?.place?.["single"];
    let place2 =
      n2?.place?.[get(currentHeatName)] ??
      n2?.place?.["Final"] ??
      n2?.place?.["single"];
    if (place1 == "") {
      place1 = Number.MAX_SAFE_INTEGER;
    }
    if (place2 == "") {
      place2 = Number.MAX_SAFE_INTEGER;
    }
    if (place1 > place2) {
      return 1;
    }
    if (place1 < place2) {
      return -1;
    }
    return 0;
  });
};

const getHeatName = (): string => {
  const units = get(currentEventData)["units"];
  for (const unit of units) {
    if (unit.heatName === get(currentHeatName)) {
      return getValueFromTranslation(unit.heatName);
    }
  }
};

const heatExists = (): boolean => {
  const units = get(currentEventData)["units"];
  for (const unit of units) {
    if (unit.heatName) {
      return true;
    }
  }
  return false;
};
