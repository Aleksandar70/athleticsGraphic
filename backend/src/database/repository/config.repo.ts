import { IConfig } from "../../../../global/interfaces";
import { ConfigModel } from "../models/config.model";
import fs from "fs";
import * as defaultLocale from "../../../../i18n/default.json";

export const createDefaultConfig = async (): Promise<IConfig> => {
  await ConfigModel.create({});

  const localeFiles = getLocaleFileNames();

  if (localeFiles.length) {
    await updateConfig({ languages: localeFiles });
  }

  return getConfig()?.[0];
};

const getLocaleFileNames = (): string[] => {
  const localeFiles: string[] = [];
  const pathToNewLocale = process.cwd().replace(/([^\\]+$)/g, `i18n`);
  const fileNames = fs.readdirSync(pathToNewLocale);
  for (const file of fileNames) {
    const localeName = file.match(/[^.]*/gm)?.[0] ?? "";
    localeFiles.push(localeName);
  }
  return localeFiles;
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
  await ConfigModel.updateOne({}, { $push: { languages: name } });
  const pathToNewLocale = process
    .cwd()
    .replace(/([^\\]+$)/g, `i18n\\${name}.json`);
  const newLocaleData = {};
  Object.keys(defaultLocale).forEach((key) => (newLocaleData[key] = ""));
  fs.writeFileSync(pathToNewLocale, JSON.stringify(newLocaleData));
  return defaultLocale;
};

export const editLocale = async (
  locale: string,
  editedLocale: Record<string, string>
) => {
  const pathToEditedLocale = process
    .cwd()
    .replace(/([^\\]+$)/g, `i18n\\${locale}.json`);
  fs.writeFileSync(pathToEditedLocale, JSON.stringify(editedLocale));
};
