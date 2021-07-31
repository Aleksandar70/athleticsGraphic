export const isFlag = (value: Array<string>): boolean => {
  const stringValue = value.toString();
  return stringValue.includes("flag") && stringValue.endsWith(".svg");
};

export const getAltName = (value: Array<string>): string => {
  if (isFlag(value)) {
    return value.toString().match(/([^\\/]+$)/gm)?.[0];
  }
};
