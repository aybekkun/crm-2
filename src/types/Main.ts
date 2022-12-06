import { ILeadStatistics } from './Statistics';

export interface IMainData {
  waits: number;
  students: number;
  teachers: number;
  courses: number;
  groups: number;
  lead: ILeadStatistics[];
}
