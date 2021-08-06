export interface IDirectionResult {
  resultId;
  first;
  second;
  third;
  fourth;
  fifth;
  sixth;
  performance;
  place;
}

export interface IHorizontalResult extends IDirectionResult {}

export interface IVerticalResult extends IDirectionResult {}
export interface IRunningResult {
  resultId;
  performance;
  place;
}
