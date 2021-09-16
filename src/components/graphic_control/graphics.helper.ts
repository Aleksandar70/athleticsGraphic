import { get } from "svelte/store";
import { Graphics } from "../../../global/constants/constants";
import type { TableField } from "../../../global/types";
import {
  currentEventData,
  selectedParticipant,
} from "../../stores/table.store";
import { isNumeric } from "../../utils/string.utils";

export const getDataForPreviewModal = (
  id: Graphics
): Record<string, string> => {
  const data = {};
  switch (id) {
    case Graphics.EVENT_ANNOUNCEMENT:
      data["Event Name"] = "6th SERBIAN OPEN INDOOR MEETING";
      data["Location"] = "BELGRADE, FEBRUARY 2021";
      data["Hashtag"] = "#belgrade2021";
      break;
    case Graphics.PERSONAL_BEST:
      data["Event Name"] = get(currentEventData)["name"];
      data["ID"] = getFieldValueFromParticipant("competitorId");
      data["First Name"] = getFieldValueFromParticipant("firstName");
      data["Last Name"] = getFieldValueFromParticipant("lastName");
      data["Flag"] = getFieldValueFromParticipant("nationality");
      data["Nationality"] = getFieldValueFromParticipant("nationality");
      get(selectedParticipant).filter((field) => isNumeric(field.id)).length
        ? (data["Scores"] = getScores())
        : (data["Result"] = getFieldValueFromParticipant("result"));
      break;
    case Graphics.DISCIPLINE_ANNOUNCEMENT:
      data["Discipline Name"] = get(currentEventData)["name"];
      data["Note"] = "NEXT";
      data["Time"] = get(currentEventData)["r1Time"];
  }
  return data;
};

const getFieldValueFromParticipant = (key: string): string =>
  get(selectedParticipant).find((field) => field.id === key)?.stringValue;

const getScores = (): unknown[] =>
  get(selectedParticipant)
    .filter((field) => isNumeric(field.id))
    .map((score: TableField) => ({ [score.id]: score.stringValue }));
