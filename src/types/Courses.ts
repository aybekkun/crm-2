import { IPagination } from './index';

export interface ICourses extends IPagination {
  data: ICourseData[];
}

export interface ICourseData {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export interface ICoursesForm {
  id?: number;
  name: string;
  price: number;
  duration: number;
}
