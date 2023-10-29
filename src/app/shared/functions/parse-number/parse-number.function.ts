export const parseNumber = (number: string): number => {
  const parsedFloat = Math.floor(Number.parseFloat(number));

  return Number.isNaN(parsedFloat) ? 0 : parsedFloat;
};
