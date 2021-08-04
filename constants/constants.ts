export abstract class Constants {
  static readonly EMPTY_STRING: string = "";
  static readonly PERFORMANCE_DNF: string = "DNF";
  static readonly PERFORMANCE_DQ: string = "DQ";
  static readonly PERFORMANCE_DNS: string = "DNS";
  static readonly JSON_NOCACHE: string = "/json?nocache=1";

  static readonly DEFAULT_COMPETITION_YEAR: number = 2021;
}

export enum GTYPE {
  LOCAL = "local",
  REMOTE = "remote",
  SEMI = "semi",
}
