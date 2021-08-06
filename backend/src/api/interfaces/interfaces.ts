interface IDirectionResult {
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

interface IHorizontalResult extends IDirectionResult {}

interface IVerticalResult extends IDirectionResult {}
interface IRunningResult {
  resultId;
  performance;
  place;
}
