export const formatDate = (date: string | undefined | null) => {
  if (!date) return "Present";
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};