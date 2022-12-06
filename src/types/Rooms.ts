import { IPagination } from './index';

export interface IRooms {
  id: number;
  name: string;
}

export interface IRoomsData extends IPagination {
  data: IRooms[];
}
