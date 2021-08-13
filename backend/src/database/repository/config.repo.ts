import { ConfigModel } from "../models/config.model";

export const createDefaultConfig = async (): Promise<void> => {
  if ((await ConfigModel.countDocuments()) > 0) return;
  ConfigModel.create({});
};

export const updateConfig = async (config) => {
  await ConfigModel.updateMany({}, { $set: config });
};

export const getConfig = () => ConfigModel.find();
