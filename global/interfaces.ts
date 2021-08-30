import type { TableFieldType } from "./types";

export interface ITableHeader {
  value: string;
}

export interface ITableField {
  value: TableFieldType;
  stringValue: string;
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
