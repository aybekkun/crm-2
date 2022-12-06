import { IGroupData } from './Groups';
import { IPagination } from './index';
import { IPaymentData } from './Payments';

export interface IStudents extends IPagination {
  data: IStudentData[];
}

export interface IStudentData {
  id: number;
  name: string;
  surname: string;
  phone: string;
  birthday: string;
  address: string;
  password: string;
  status: boolean;
  groups: IGroupData[];
  payments?: IPaymentData[];
  start_date?: string | moment.Moment;
  debt: string;
}

export interface IStudentsForm {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  birthday?: string | moment.Moment;
  address?: string;
  password?: string;
  group_ids?: number[];
}
