export const isFlag = (value: string): boolean => value.includes("flag") && value.endsWith(".svg");

export const getAltName = (value: string): string => value.match(/([^\\/]+$)/gm)?.[0];
