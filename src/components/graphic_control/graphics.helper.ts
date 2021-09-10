import { get } from "svelte/store";
import { Graphics } from "../../../global/constants/constants";
import {
  currentEventData,
  selectedParticipant,
} from "../../stores/table.store";

export const getDataForPreviewModal = (
  id: Graphics
): Record<string, string> => {
  const data = {};
  switch (id) {
    case Graphics.PERSONAL_SCORE:
      data["Event Name"] = get(currentEventData)["name"];
      data["ID"] = getFieldValueFromParticipant("competitorId");
      data["First Name"] = getFieldValueFromParticipant("firstName");
      data["Last Name"] = getFieldValueFromParticipant("lastName");
      data["Flag"] = getFieldValueFromParticipant("nationality");
      data["Nationality"] = getFieldValueFromParticipant("nationality");
  }
  return data;
};

const getFieldValueFromParticipant = (key: string): string =>
  get(selectedParticipant).find((field) => field.id === key)?.stringValue;
