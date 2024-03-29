import axios, { AxiosResponse } from "axios";
import { OpenTrack } from "../../../global/constants/api";
import type { ICompetition, IOTCompetitionData } from "../database/interfaces";

export const getOTCompetitionData = async (): Promise<IOTCompetitionData> => {
  try {
    const otCompetitionData: AxiosResponse<ICompetition> = await axios.get(
      `${OpenTrack.OPEN_TRACK_API}${OpenTrack.JSON_NOCACHE}`
    );
    const competitionData = otCompetitionData.data;
    return {
      competitionData: unwrapCompetition(competitionData),
      competitorsData: competitionData.competitors ?? [],
      eventsData: competitionData.events ?? [],
      relayTeamsData: competitionData.relayTeams ?? [],
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const unwrapCompetition = ({
  address,
  city,
  contactDetails,
  country,
  date,
  englishName,
  finishDate,
  fullName,
  id,
  latitude,
  longitude,
  organiser,
  shortName,
  slug,
  teamTypes,
  // teams
  type,
  // venue
  website,
  year,
}: ICompetition): ICompetition => ({
  address,
  city,
  contactDetails,
  country,
  date,
  englishName,
  finishDate,
  fullName,
  id,
  latitude,
  longitude,
  organiser,
  shortName,
  slug,
  teamTypes,
  // teams
  type,
  // venue
  website,
  year,
});
