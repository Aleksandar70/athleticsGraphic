import { IConfig } from "../../../../global/interfaces";
import { ConfigModel } from "../models/config.model";

export const createDefaultConfig = async (): Promise<IConfig> => {
  if ((await ConfigModel.countDocuments()) > 0) return {} as IConfig;
  return await ConfigModel.create({});
};

export const updateConfig = async (config: IConfig): Promise<IConfig[]> =>
  await ConfigModel.updateMany({}, { $set: config });

export const getConfig = async (): Promise<IConfig[]> =>
  await ConfigModel.find();

export const getDataSource = async (): Promise<string> => {
  const config = await getConfig();
  return config?.[0]?.dataSource;
};
