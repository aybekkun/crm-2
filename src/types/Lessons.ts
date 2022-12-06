export interface ILessonsData {
  room_name: string;
  room_id: number;
  days: ILessonsDay[][];
}

export interface ILessonsDay {
  id: number;
  group_id: number;
  group_name: string;
  start_time: string;
  end_time: string;
}
