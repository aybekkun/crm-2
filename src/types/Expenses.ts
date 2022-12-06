import { IPagination } from './index';

export interface IExpenses extends IPagination {
  data: IExpenseData[];
  total_sum: number;
}

export interface IExpenseData {
  id?: string | undefined;
  name: string | null;
  title: string;
  type: string;
  to_id: number;
  sum: number;
  date: Date | null;
  user_id: string | undefined;
}

export interface IExpensesForm {
  id?: number;
  name: string;
  title: string;
  sum: number;
  date: Date | null;
  user_id: number;
}
