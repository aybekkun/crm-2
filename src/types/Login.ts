export interface ILogin {
  id: string;
  name: string;
  surname: string;
  phone: string;
  birthday: string;
  address: string;
  password: string;
  role: string;
  token: string;
  groups?: IGroups[];
}

export interface IGroups {
  id: number;
  name: string;
}
