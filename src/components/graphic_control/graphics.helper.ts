import { get } from "svelte/store";
import { Graphics } from "../../../global/constants/constants";
import type { ICompetitor } from "../../../global/interfaces";
import { getCompetitorsForEvent } from "../../api/competitor.api";
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
    case Graphics.ANNOUNCEMENT:
      data["Event Name"] = "6th SERBIAN OPEN INDOOR MEETING";
      data["Location"] = "BELGRADE, FEBRUARY 2021";
      data["Hashtag"] = "#belgrade2021";
      break;
    case Graphics.PERSONAL_SCORE:
      data["Event Name"] = get(currentEventData)["name"];
      data["ID"] = getFieldValueFromParticipant("competitorId");
      data["First Name"] = getFieldValueFromParticipant("firstName");
      data["Last Name"] = getFieldValueFromParticipant("lastName");
      data["Flag"] = getFieldValueFromParticipant("nationality");
      data["Nationality"] = getFieldValueFromParticipant("nationality");
      data["Scores"] = getScores();
      break;
    case Graphics.START_LIST:
      data["Competition"] = "6th SERBIAN OPEN INDOOR MEETING";
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = get(currentEventData)["name"];
      data["Title"] = "STARTING LIST";
      data["Competitors"] = getCompetitorsForEvent2("event");
      break;
    case Graphics.RESULT_LIST:
      data["Competition"] = "6th SERBIAN OPEN INDOOR MEETING";
      data["Hashtag"] = "#belgrade2021";
      data["Event Name"] = get(currentEventData)["name"];
      data["Title"] = "RESULTS";
      data["Competitors"] = getCompetitorsForEvent2("event");
  }
  return data;
};

const getFieldValueFromParticipant = (key: string): string =>
  get(selectedParticipant).find((field) => field.id === key)?.stringValue;

const getCompetitorsForEvent2 = async (key: string): Promise<ICompetitor[]> => {
  console.log("eventId: ", getFieldValueFromParticipant("event"));
  const competitorData = await getCompetitorsForEvent("F01");
  console.log("competitors: ", competitorData);
  return competitorData;
};

const getScores = (): string[] =>
  get(selectedParticipant)
    .filter((field) => isNumeric(field.id))
    .map((scores) => scores?.stringValue);
