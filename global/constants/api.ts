export abstract class Paths {
  static readonly SERVER_PORT = 5001;
  static readonly STREAMING_PORT = 5002;
  static readonly IPV4 = "192.168.0.15";
  static readonly SERVER_URL = `http://${Paths.IPV4}:${Paths.SERVER_PORT}/`;
  static readonly CLIENT_URL = `http://${Paths.IPV4}:5000/`;
  static readonly ROOT_PATH = "/";

  static readonly RESULTS = "results";
  static readonly RESULTS_PATH = `${Paths.ROOT_PATH}${Paths.RESULTS}`;

  static readonly TRIALS = "trials";
  static readonly TRIALS_PATH = `${Paths.ROOT_PATH}${Paths.TRIALS}`;

  static readonly EVENTS = "events";
  static readonly EVENTS_PATH = `${Paths.ROOT_PATH}${Paths.EVENTS}`;

  static readonly COMPETITOR = "competitor";
  static readonly COMPETITOR_PATH = `${Paths.ROOT_PATH}${Paths.COMPETITOR}`;

  static readonly RELAY_TEAMS = "relayTeams";
  static readonly RELAY_TEAMS_PATH = `${Paths.ROOT_PATH}${Paths.RELAY_TEAMS}`;

  static readonly SIGNATURE = "signature";
  static readonly SIGNATURE_PATH = `${Paths.ROOT_PATH}${Paths.SIGNATURE}`;

  static readonly CONFIG = "config";
  static readonly CONFIG_PATH = `${Paths.ROOT_PATH}${Paths.CONFIG}`;

  static readonly STREAM = "stream";
  static readonly STREAM_PATH = `${Paths.ROOT_PATH}${Paths.STREAM}`;

  static readonly PREVIEW = "preview";
  static readonly PREVIEW_PATH = `${Paths.ROOT_PATH}${Paths.PREVIEW}`;

  static readonly DATABASE = "database";
  static readonly DATABASE_PATH = `${Paths.ROOT_PATH}${Paths.DATABASE}`;

  static readonly GRAPHICS = "graphics";
  static readonly GRAPHICS_PATH = `${Paths.ROOT_PATH}${Paths.GRAPHICS}`;
}

export abstract class OpenTrack {
  static readonly COMPETITION_YEAR = 2021;
  static readonly COMPETITION_COUNTRY = "SRB";
  static readonly COMPETITION_ID = "balkan_u18";
  static readonly OPEN_TRACK_API = `https://data.opentrack.run/en-gb/x/${OpenTrack.COMPETITION_YEAR}/${OpenTrack.COMPETITION_COUNTRY}/${OpenTrack.COMPETITION_ID}`;

  static readonly OPEN_TRACK_API_EVENT = `${OpenTrack.OPEN_TRACK_API}/event`;

  static readonly JSON_NOCACHE: string = "/json?nocache=1";
}
