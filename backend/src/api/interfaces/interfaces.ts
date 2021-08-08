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
  heat: string;
  round: string;
  order?: string;
}
