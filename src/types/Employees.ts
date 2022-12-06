export interface IEmployeesData {
  id: number;
  name: string;
  surname: string;
  phone: string;
  birthday: string | moment.Moment;
  address: string;
  password: string;
  salary: number;
  role: string;
  role_id: number;
}

export interface IEmployeesForm {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  birthday: string | moment.Moment;
  address: string;
  password: string;
  salary: number;
  role_id: number;
  role: string;
}

export interface IRolesData {
  id: number;
  name: string;
}

export interface IEmployeeSalary {
  employee_id: number;
  name: string;
  salary: number;
}
