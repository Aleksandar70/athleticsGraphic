import axios, { AxiosResponse } from "axios";
import { OpenTrack } from "../../../global/constants/api";
import { ICompetition } from "../database/interfaces";

interface IOTCompetitionData {
  competitionData;
  competitorsData;
  eventsData;
}

export const getOTCompetitionData = async (): Promise<IOTCompetitionData> => {
  try {
    const otCompetitionData: AxiosResponse<any> = await axios.get(
      `${OpenTrack.OPEN_TRACK_API}${OpenTrack.JSON_NOCACHE}`
    );
    const competitionData = otCompetitionData.data;
    return {
      competitionData: unwrapCompetition(competitionData),
      competitorsData: competitionData.competitors,
      eventsData: competitionData.events,
    };
  } catch (err) {
    console.error(err);
    return err;
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
  // relayTeams
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
  // relayTeams
  shortName,
  slug,
  teamTypes,
  // teams
  type,
  // venue
  website,
  year,
});
