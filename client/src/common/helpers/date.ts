export const isInThePast = (date: string): boolean => {
  const currentDate = new Date().toISOString();
  
  return Date.parse(currentDate) > Date.parse(date);
};

export const get2DigitMonth = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
  }).format(date);
};