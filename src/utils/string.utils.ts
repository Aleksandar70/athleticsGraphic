export const isNumeric = (value: string): boolean => {
  if (typeof value != "string") return false;
  return !isNaN(parseInt(value)) && !isNaN(parseFloat(value));
};
