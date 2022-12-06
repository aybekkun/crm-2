import { IPagination } from './index';

export interface IPayments extends IPagination {
  data: IPaymentData[];
  total_sum: number;
}

export interface IPaymentData {
  id?: number;
  student_name?: string;
  student_id: number;
  group_name?: string;
  group_id: number;
  sum: number;
  date: string | moment.Moment;
  type: string;
  comment: string;
}

export interface IPaymentsForm {
  id?: number;
  student_name?: string;
  student_id: number;
  group_name?: string;
  group_id: number;
  sum: number;
  date: string | moment.Moment;
  type: string;
  comment: string;
}
