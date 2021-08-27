import type { TableFieldType } from "./types";

export interface ITableHeader {
  value: string;
  show: boolean;
}

export interface ITableField {
  value: TableFieldType;
  stringValue: string;
  show: boolean;
  changed: boolean;
  link?: string;
  id: string;
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
  heat: number;
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

export interface IResult {
  bib: string;
}

export interface ICompetitor {
  competitorId: string;
}
