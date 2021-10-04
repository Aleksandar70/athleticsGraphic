export abstract class Constants {
  static readonly ROWS_PER_TABLE: number = 8;
}

export enum SOURCE {
  LOCAL = "local",
  REMOTE = "remote",
}

export enum Graphics {
  PERSONAL_SCORE = "personal_score",
  ANNOUNCEMENT = "announcement",
  START_LIST = "start_list",
  RESULT_LIST = "result_list",
  EVENT_ANNOUNCEMENT = "announcement",
  DISCIPLINE_ANNOUNCEMENT = "discipline announcement",
  MEDALS = "medals",
  TIME = "time",
  PERSONAL_DATA = "personal_data",
}

export enum EventType {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  RUNNING = "running",
}
