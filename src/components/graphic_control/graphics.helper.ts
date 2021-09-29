import { get, Readable } from "svelte/store";
import type {
  ICompetitor,
  IResult,
} from "../../../backend/src/database/interfaces";
import { Graphics } from "../../../global/constants/constants";
import type { TableField } from "../../../global/types";
import {
  competitors,
  currentCompetitionData,
  currentEventData,
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
        "englishName",
        currentCompetitionData
      );
      data["Location"] = "BELGRADE, FEBRUARY 2021";
      data["Hashtag"] = "#belgrade2021";
      break;
    case Graphics.PERSONAL_SCORE:
      data["Event Name"] = getValueFromTranslation("name", currentEventData);
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
        "englishName",
        currentCompetitionData
      );
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = getValueFromTranslation("name", currentEventData);
      data["Description"] = "STARTING LIST";
      data["Competitors"] = getCompetitors();
      break;
    case Graphics.RESULT_LIST:
      data["Competition"] = getValueFromTranslation(
        "englishName",
        currentCompetitionData
      );
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = getValueFromTranslation("name", currentEventData);
      data["Description"] = "RESULTS";
      data["Competitors"] = getCompetitors();
      break;
    case Graphics.DISCIPLINE_ANNOUNCEMENT:
      data["Discipline Name"] = getValueFromTranslation(
        "name",
        currentEventData
      );
      data["Note"] = "NEXT";
      data["Time"] = getValueFromTranslation("r1Time", currentEventData);
      break;
    case Graphics.MEDALS:
      data["Competition"] = getValueFromTranslation(
        "englishName",
        currentCompetitionData
      );
      data["Event Name"] = getValueFromTranslation("name", currentEventData);
      data["Hashtag"] = "#belgrade2021";
      data["Description"] = "MEDALS";
      data["Medals"] = getBestResults();
  }
  return data;
};

const getFieldValueFromParticipant = (key: string): string =>
  get(selectedParticipant).find((field) => field.id === key)?.stringValue;

const getValueFromTranslation = (
  key: string,
  fallbackStore: Readable<Record<string, string>>
): string => {
  const localeKey =
    fallbackStore === currentCompetitionData
      ? key
      : `${key}_${get(currentEventData)["eventId"]}`;
  const hasTranslation = get(_)(localeKey) !== localeKey;
  return hasTranslation ? get(_)(localeKey) : get(fallbackStore)[key];
};

const getCompetitors = (list?: ICompetitor[]): Record<string, string>[] => {
  const competitorList = list ? list : get(competitors);
  return competitorList.map((competitor) => ({
    name: `${competitor.firstName} ${competitor.lastName}`,
    nationality: competitor.nationality,
    result: competitor.result,
  }));
};

const getScores = (): unknown[] =>
  get(selectedParticipant)
    .filter((field) => isNumeric(field.id))
    .map((score: TableField) => ({ [score.id]: score.stringValue }));

const getBestResults = (): Record<string, string>[] => {
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
  sortByAscendingOrder(bestCompetitors);
  return bestCompetitors;
};

const sortByAscendingOrder = (objectArray: Record<string, string>[]): void => {
  objectArray.sort((n1, n2) => {
    if (n1.result > n2.result) {
      return 1;
    }
    if (n1.result < n2.result) {
      return -1;
    }
    return 0;
  });
};
