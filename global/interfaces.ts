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
  rounds?: number;
  trials: ITrial[];
  results: IResult[];
}

export interface ITrial {}

export interface IResult {}
