export abstract class Constants {
  static readonly ROWS_PER_TABLE: number = 8;
}

export abstract class Regex {
  /* Finds text after the last '\' or '/' character in a string (eg. one\two\three -> three) */
  static readonly AFTER_LAST_SLASH = /([^\\/]+$)/gm;
  /* Splits text into array of words separated by dot (eg. one.two.three -> [one, two, three]) */
  static readonly SPLIT_BY_DOT = /[^.]*/gm;
  /* Finds text that has a least 3 alphabet letter in it, in sequence (eg. `123test` is correct, 'm 123ft' is not correct) */
  static readonly FIND_WORDS = /\b.*[a-zA-Z]{3,}.*\b/;
  /* Finds text that is before first dot (eg. serbia.png => serbia) */
  static readonly BEFORE_FIRST_DOT = /.*(?=\.)/gm;
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
}

export enum EventType {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  RUNNING = "running",
}
