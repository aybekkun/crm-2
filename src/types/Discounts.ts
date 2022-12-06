import { IPagination } from './index';

export interface IDiscountsData {
  student_id: number;
  id: number;
  sum: number;
  comment: string;
  start_date: string;
  end_date: string;
  total_sum: number;
}

export interface IDiscounts extends IPagination {
  data: IDiscountsData[];
}
