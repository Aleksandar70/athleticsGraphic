export abstract class Paths {
  static readonly SERVER_PORT = 5001;
  static readonly SERVER_URL = `http://localhost:${Paths.SERVER_PORT}/`;
  static readonly CLIENT_URL = "http://localhost:5000/";
  static readonly ROOT_PATH = "/";

  static readonly RESULTS = "results";
  static readonly RESULTS_PATH = `${Paths.ROOT_PATH}${Paths.RESULTS}`;

  static readonly EVENTS = "events";
  static readonly EVENTS_PATH = `${Paths.ROOT_PATH}${Paths.EVENTS}`;

  static readonly COMPETITOR = "competitor";
  static readonly COMPETITOR_PATH = `${Paths.ROOT_PATH}${Paths.COMPETITOR}`;
}

export abstract class OpenTrack {
  static readonly COMPETITION_YEAR = 2021;
  static readonly COMPETITION_COUNTRY = "SRB";
  static readonly COMPETITION_ID = "srbopenindoor";
  static readonly OPEN_TRACK_API = `https://data.opentrack.run/en-gb/x/${OpenTrack.COMPETITION_YEAR}/${OpenTrack.COMPETITION_COUNTRY}/${OpenTrack.COMPETITION_ID}`;

  static readonly OPEN_TRACK_API_EVENT = `${OpenTrack.OPEN_TRACK_API}/event`;

  static readonly JSON_NOCACHE: string = "/json?nocache=1";
}