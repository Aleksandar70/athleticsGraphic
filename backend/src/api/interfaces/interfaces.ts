export interface IDirectionResult {
  resultId: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  performance: string;
  place: string;
}

export interface IHorizontalResult extends IDirectionResult {}

export interface IVerticalResult extends IDirectionResult {}
export interface IRunningResult {
  resultId: string;
  performance: string;
  place: string;
}

export interface IOpenTrackData {
  data: Record<string, unknown>;
  results: Record<string, unknown>[];
  trials: Record<string, unknown>[];
}

export interface IResultParams {
  gType: string;
  heat: number;
  round: number;
  order?: string;
}

export interface ITableData {
  advancement: string;
  age_group: string;
  athlon_points: string;
  bib: string;
  date_of_birth: string;
  flag: string;
  gender: string;
  last_name: string;
  performance: string;
  team_name: string;
}
