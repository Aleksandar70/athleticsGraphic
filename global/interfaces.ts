import type { TableFieldType, TableRow } from "./types";

export interface ITableHeader {
  value: string;
}

export interface ITableField {
  value: TableFieldType;
  stringValue: string;
  changed: boolean;
  link?: string;
  id: string;
  round: boolean;
  height: boolean;
}

export interface ISelectedRow {
  id: string;
  data: TableRow;
}

export interface IConfig {
  dataSource: string;
}

export interface ISearch {
  enable: boolean;
  key?: string;
}
export interface IEvent {
  units: IUnit[];
}

export interface IUnit {
  heatName: string;
  heights: string[];
  rounds?: number;
  trials: ITrial[];
  results: IResult[];
}

export interface ITrial {
  bib: string;
  result?: string;
  height?: string;
  round?: number;
}

export interface IHeatEventData {
  heatName: string;
  competitors: ICompetitor[];
}

export interface IResult {
  bib: string;
  performance: string;
}

export interface ICompetitor {
  competitorId: string;
}
