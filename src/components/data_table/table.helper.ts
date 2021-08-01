import { tempGetData } from "../../../backend/src/api/openTrack";

export const getTableData = async (): Promise<Record<string, unknown>[]> => {
  const fetchedData = await tempGetData();
  return fetchedData.results;
};

export const getColumns = (data: Record<string, unknown>[]): Array<string> =>
  Object.keys(data?.[0])?.map((val: string) =>
    val.replaceAll("_", " ").toUpperCase()
  );

export const parseTableData = (data: Record<string, unknown>[]): unknown[][] =>
  data?.map((d) => Object.keys(d).map((key) => [d[key]]));

export const hideColumn = (
  field: Record<string, unknown>,
  data: Array<Array<Record<string, unknown>>>
): Array<Array<Record<string, unknown>>> => {
  data.forEach((record) => {
    const rec = record.find((element) => element.id === field.id);
    rec.show = !rec.show;
  });
  return data;
};
