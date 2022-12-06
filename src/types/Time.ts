import { IPagination } from '.';

export interface ITime {
  id: number;
  name: string;
}

export interface ITimeData extends IPagination {
  data: ITime[];
}
