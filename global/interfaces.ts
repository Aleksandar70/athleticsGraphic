export interface ITableHeader {
  value: string;
  show: boolean;
}

export interface ITableField {
  value: string;
  show: boolean;
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
