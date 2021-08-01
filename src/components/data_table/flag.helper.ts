export const isFlag = (value: string[]): boolean => {
  const stringValue = value.toString();
  return stringValue.includes("flag") && stringValue.endsWith(".svg");
};

export const getAltName = (value: string[]): string => {
  if (isFlag(value)) {
    return value.toString().match(/([^\\/]+$)/gm)?.[0];
  }
};
