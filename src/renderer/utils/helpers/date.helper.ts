import { START_OF_TIME } from '@constants/data_format';

export const timeToDate = (hour: number, min: number) => {
  const time = new Date(START_OF_TIME);
  time.setHours(hour, min);
  return time;
};
export const dateToTime = (date: Date) => {
  return date.getHours() + ':' + date.getMinutes();
};
