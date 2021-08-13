import { IConfig } from "../../../../global/interfaces";
import { ConfigModel } from "../models/config.model";

export const createDefaultConfig = async (): Promise<void> => {
  if ((await ConfigModel.countDocuments()) > 0) return;
  ConfigModel.create({});
};

export const updateConfig = async (config: IConfig): Promise<void> => {
  await ConfigModel.updateMany({}, { $set: config });
};

export const getConfig = (): IConfig[] => ConfigModel.find();

export const getDataSource = async () => {
  const config = await getConfig();
  return config?.[0]?.dataSource;
};
