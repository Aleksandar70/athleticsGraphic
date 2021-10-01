import { IConfig } from "../../../../global/interfaces";
import { ConfigModel } from "../models/config.model";
import fs from "fs";
import * as defaultLocale from "../../../../i18n/default.json";

export const createDefaultConfig = async (): Promise<IConfig> => {
  return await ConfigModel.create({});
};

export const updateConfig = async (config: IConfig): Promise<IConfig[]> =>
  await ConfigModel.updateMany({}, { $set: config });

export const getConfig = async (): Promise<IConfig[]> =>
  await ConfigModel.find();

export const getDataSource = async (): Promise<string> => {
  const config = await getConfig();
  return config?.[0]?.dataSource ?? "";
};

export const addNewLocale = async (
  name: string
): Promise<Record<string, string>> => {
  const pathToNewLocale = process
    .cwd()
    .replace(/([^\\]+$)/g, `i18n\\${name}.json`);
  const newLocaleData = {};
  Object.keys(defaultLocale).forEach((key) => (newLocaleData[key] = ""));
  fs.writeFileSync(pathToNewLocale, JSON.stringify(newLocaleData));
  return defaultLocale;
};
