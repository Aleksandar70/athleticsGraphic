export abstract class Constants {
  static readonly ROWS_PER_TABLE: number = 8;
}

export enum SOURCE {
  LOCAL = "local",
  REMOTE = "remote",
}

export enum Graphics {
  PERSONAL_BEST = "personal_best",
  EVENT_ANNOUNCEMENT = "announcement",
  DISCIPLINE_ANNOUNCEMENT = "discipline announcement",
}

export enum EventType {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  RUNNING = "running",
}
