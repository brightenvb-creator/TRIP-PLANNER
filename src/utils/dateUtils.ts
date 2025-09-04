import { format, parseISO, differenceInDays } from 'date-fns';

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const formatDateInput = (dateString: string): string => {
  return format(parseISO(dateString), 'yyyy-MM-dd');
};

export const getTripDuration = (startDate: string, endDate: string): number => {
  return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
};

export const generateDateRange = (startDate: string, endDate: string): string[] => {
  const dates = [];
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const duration = differenceInDays(end, start);
  
  for (let i = 0; i <= duration; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    dates.push(format(currentDate, 'yyyy-MM-dd'));
  }
  
  return dates;
};