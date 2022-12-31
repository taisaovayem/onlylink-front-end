import { format } from 'date-fns';

export function formatDate(date: string | Date, formatType = 'dd/MM/yyyy') {
  if (date === '') {
    return '';
  }
  const d = new Date(date);
  return format(d, formatType);
}

export function dateToString(date: Date, formatType = 'dd/MM/yyyy') {
  return format(date, formatType);
}
