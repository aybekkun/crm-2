import { DateObject, Value } from 'react-multi-date-picker';

export const getDaysOfCalendar = (months: string, whichDays: string): Value => {
  const days: Value[] = [];
  let count = 0;

  for (let i = 0; i < +months; i++) {
    let today = new DateObject().add(i, 'month').day;
    const lastDay = new DateObject().add(i, 'month').toLastOfMonth().day;
    if (i !== 0) {
      today = 1;
    }
    const leng = lastDay - today + 1;
    count += leng;
  }

  for (let i = 0; i < count; i++) {
    days.push(new DateObject().add(i, 'day'));
  }

  const result: any = days.filter((day: any) => {
    if (whichDays === 'odd') {
      const isWeekend = [1, 3, 5].includes(day.weekDay.index);

      if (isWeekend) return day;
    } else if (whichDays === 'even') {
      const isWeekend = [2, 4, 6].includes(day.weekDay.index);

      if (isWeekend) return day;
    } else {
      const isWeekend = [1, 2, 3, 4, 5, 6].includes(day.weekDay.index);
      if (isWeekend) return day;
    }
  });
  return result;
};
