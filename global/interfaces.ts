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

export interface IOpenTrackEventData {
  eventId: string;
  genders: string;
  name: string;
  r1Time: string;
  rounds: string;
  status: string;
}

export interface IResultParams {
  eventId: string;
  gType: string;
  heat?: number;
  round?: number;
  order?: string;
}

export interface ITableData {
  advancement: string;
  age_group: string;
  athlon_points: string;
  bib: string;
  category: string;
  catpos: string;
  date_of_birth: string;
  extra_url: string;
  finish_time: string;
  first_name: string;
  first_name_local: string;
  flag: string;
  gender: string;
  lane: string;
  last_name: string;
  last_name_local: string;
  needs_review: string;
  note: string;
  pb: string;
  performance: string;
  place: string;
  points: string;
  qp: string;
  raw_time: string;
  reaction_time: string;
  sb: string;
  start_time: string;
  team: string;
  team_category: string;
  team_name: string;
}
