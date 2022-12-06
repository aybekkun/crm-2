import { ICourseData } from './Courses';
import { IExpenseData } from './Expenses';
import { IPagination } from './index';

export interface ITeachers extends IPagination {
  data: ITeacherData[];
}

export interface ITeacherData {
  id: number;
  name: string;
  surname: string;
  phone: string;
  birthday: string;
  address: string;
  courses: ICourseData[];
  percent?: number;
}

export interface ITeachersForm {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  birthday?: string | moment.Moment;
  address?: string;
  password?: string;
  course_ids?: number[];
  percent?: number;
}

export interface ITeacherOneData extends ITeacherData {
  groups: ITeacherGroups[];
  salaries: IExpenseData[];
}

export interface ITeacherGroups {
  id: string;
  name: string;
}
