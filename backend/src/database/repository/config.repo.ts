import { IConfig } from "../../../../global/interfaces";
import { ConfigModel } from "../models/config.model";
import fs from "fs";
import * as defaultLocale from "../../../../i18n/default.json";
import { Regex } from "../../../../global/constants/constants";

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
  const pathToNewLocale = process.cwd().replace(Regex.AFTER_LAST_SLASH, `i18n`);
  const fileNames = fs.readdirSync(pathToNewLocale);
  for (const file of fileNames) {
    const localeName = file.match(Regex.SPLIT_BY_DOT)?.[0] ?? "";
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
  const pathToNewLocale = getLocalePath(name);
  const newLocaleData = {};
  Object.keys(defaultLocale).forEach((key) => (newLocaleData[key] = ""));
  fs.writeFileSync(pathToNewLocale, JSON.stringify(newLocaleData));
  return defaultLocale;
};

export const editLocale = async (
  locale: string,
  editedLocale: Record<string, string>
) => {
  const pathToEditedLocale = getLocalePath(locale);
  fs.writeFileSync(pathToEditedLocale, JSON.stringify(editedLocale));
};

export const getLocalePair = (locale: string) => {
  const pathToDefaultLocale = getLocalePath("default");
  const pathToEditedLocale = getLocalePath(locale);
  const defaultJson = JSON.parse(
    fs.readFileSync(pathToDefaultLocale).toString()
  );
  const editedJson = JSON.parse(fs.readFileSync(pathToEditedLocale).toString());
  return { default: defaultJson, locale: editedJson };
};

const getLocalePath = (name: string) =>
  process.cwd().replace(Regex.AFTER_LAST_SLASH, `i18n\\${name}.json`);
