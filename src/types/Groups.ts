import { IPagination } from './index';

export interface IGroups extends IPagination {
  data: IGroupData[];
}

export interface IGroupData {
  id: number | undefined;
  name: string;
  course_id: number;
  course_name: string;
  teacher_id: number;
  teacher_name: string;
}

export interface IStudentsGroup {
  id: number;
  name: string;
  phone: string;
  freezed_at: string;
  actived_at: string;
  balance: number;
  debt: boolean;
  status: string;
  lessons: ILessonsGroup[];
}

export interface ILessonsGroup {
  id: number;
  day: string;
  day_name: string;
  check: number;
}

export interface IJournalsGroup {
  student_id: number;
  lesson_id: number;
  attendance: boolean;
}

export interface IOneGroupData {
  group_id: number;
  group_name: string;
  duration: number;
  course_id: number;
  course_name: string;
  price: number;
  room_name: string;
  teacher_id: number;
  teacher_name: string;
  start_lesson: string;
  end_lesson: string;
  start_time: string;
  end_time: string;
  months: string[];
  students: IStudentsGroup[];
}

export interface IGroupsForm {
  id?: number;
  name: string;
  course_id: number;
  teacher_id: number;
}
