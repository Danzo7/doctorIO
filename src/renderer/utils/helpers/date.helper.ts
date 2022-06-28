import { format } from 'date-fns';

export const timeToDate = (props: { hour: number; min: number } | string) => {
  const time = new Date();
  time.setHours(0, 0, 0, 0);

  if (typeof props === 'string') {
    time.setHours(Number(props.split(':')[0]));
    time.setMinutes(Number(props.split(':')[1]));
  } else {
    time.setHours(props.hour);
    time.setMinutes(props.min);
  }
  return time;
};

export const dateToTime = (date: Date) => {
  return date.getHours() + ':' + date.getMinutes();
};
export const diffrentInTime = (date1: Date, date2: Date) => {
  const diff = date2.getTime() - date1.getTime();
  return format(new Date(diff), "hh' h 'mm' min 'ss' sec'");
};
