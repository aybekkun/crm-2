import { IPagination } from './index';

export interface ILead {
  id: number;
  name: string;
}

export interface ILeadData extends IPagination {
  data: ILead[];
}
