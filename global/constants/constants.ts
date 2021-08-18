export abstract class Constants {
  static readonly ROWS_PER_TABLE: number = 8;
}

export enum SOURCE {
  LOCAL = "local",
  REMOTE = "remote",
  SEMI = "semi",
}
