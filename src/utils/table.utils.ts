import { get } from "svelte/store";
import type { RawData } from "../../global/types";
import { currentEventId, currentHeatName } from "../stores/table.store";
import { isNumeric } from "./string.utils";

export const getTrialsToUpdateFromTable = (
  tableData: RawData
): Record<string, string>[] => {
  return tableData
    .map((row) => {
      const trialData = {};
      const numericColumns = Object.keys(row).filter((columnName) =>
        isNumeric(columnName)
      );
      trialData["competitorId"] = row.competitorId;
      numericColumns.forEach((trialColumn) => {
        trialData[trialColumn] = row[trialColumn];
        delete row[trialColumn];
      });
      return trialData;
    })
    .filter((row) => Object.keys(row)?.length > 1);
};

export const getResultsToUpdateFromTable = (
  tableData: RawData
): Record<string, string>[] => {
  return tableData
    .map((row) => {
      const resultData: Record<string, string> = {};
      resultData.competitorId = row.competitorId as string;
      resultData.teamId = row.teamId as string;
      resultData.result = row.result as string;
      resultData.place = row.place as string;
      resultData.eventId = get(currentEventId);
      resultData.heatName = get(currentHeatName);
      delete row.result;
      return resultData;
    })
    .filter((row) => row.result != undefined || row.place != undefined);
};
