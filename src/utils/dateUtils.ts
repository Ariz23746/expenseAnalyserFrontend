import {monthNames} from '../constants/months';

type DateFormatter = {
  getTime: () => string;
  getDate: () => string;
};

export const createDateFormatter = (isoDateString: string): DateFormatter => {
  const date = new Date(isoDateString);

  const getTime = (): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const getDate = (): string => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const daySuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${month} ${day}${daySuffix(day)}, ${year}`;
  };

  return {getTime, getDate};
};

export const getCurrentMonth = () => {
  const monthIndex = new Date().getMonth() + 1;
  return monthNames[monthIndex];
};

export const getCurrentDate = () => {
  const date = new Date();
  return {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};
