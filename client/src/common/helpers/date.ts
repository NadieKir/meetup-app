export const isInThePast = (finished: string): boolean => {
  const currentDate = new Date().toISOString();
  
  return Date.parse(currentDate) > Date.parse(finished);
};