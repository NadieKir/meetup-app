export const isInThePast = (date: string): boolean => {
  const currentDate = new Date().toISOString();
  
  return Date.parse(currentDate) > Date.parse(date);
};