export const formatDateToYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  return `${year}_${month}`;
};
