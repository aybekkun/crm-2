export const getCreateName = (name: string): string => {
  return `Добавить ${name}`;
};

export const getEditName = (name: string): string => {
  return `Изменить данные ${name}`;
};

export const getDeleteName = (name: string): string => {
  return `Удалить ${name}`;
};

export const CREATE: string = 'create';
export const EDIT: string = 'edit';

interface constObj {
  eng: string;
  rus: string;
  kr: string;
}

interface ITranslate {
  eng: string;
  rus: string;
  kr: string;
  en: string;
}

export const NAME: ITranslate = { eng: 'name', rus: 'Название', kr: 'Ati', en: 'Name' };
export const FULL_NAME: ITranslate = { eng: 'name', rus: 'Ф.И.О', kr: 'F.I.O', en: 'S.N.P' };
export const SURNAME: ITranslate = {
  eng: 'surname',
  rus: 'Фамилия',
  kr: 'Familiya',
  en: 'Surname',
};
export const TITLE: ITranslate = { eng: 'title', rus: 'Загаловок', kr: 'Zagalovog', en: 'Title' };
export const PHONE: ITranslate = { eng: 'phone', rus: 'Телефон номер', kr: 'Telefon', en: 'Phone' };
export const BIRTHDAY: ITranslate = {
  eng: 'birthday',
  rus: 'День рождения',
  kr: 'Tuwilgan kun',
  en: 'Birthday',
};
export const ADDRESS: ITranslate = { eng: 'address', rus: 'Адресс', kr: 'Adres', en: 'Address' };
export const PASSWORD: ITranslate = { eng: 'password', rus: 'Пароль', kr: 'Parol', en: 'Password' };
export const SALARY: ITranslate = { eng: 'salary', rus: 'Зарплата', kr: 'Ayliq', en: 'Salary' };
export const ROLE_ID: ITranslate = { eng: 'role_id', rus: 'Роли', kr: 'Roller', en: 'Roles' };
export const ROLE: ITranslate = { eng: 'role', rus: 'Роль', kr: 'Rol', en: 'Role' };
export const PRICE: ITranslate = { eng: 'price', rus: 'Стоимость', kr: 'Baxasi', en: 'Price' };
export const DURATION: ITranslate = {
  eng: 'duration',
  rus: 'Продолжительность',
  kr: 'Dawamligi',
  en: 'Duration',
};
export const START_DATE: ITranslate = {
  eng: 'start_date',
  rus: 'От',
  kr: 'Baslaniwi',
  en: 'Start date',
};
export const END_DATE: ITranslate = {
  eng: 'end_date',
  rus: 'До',
  kr: 'Tamanlaniwi',
  en: 'End date',
};
export const ACTION: ITranslate = { eng: '', rus: 'Действии', kr: 'Deystviya', en: 'Action' };
export const DATE: ITranslate = { eng: 'date', rus: 'Дата', kr: 'Data', en: 'Date' };
export const SUM: ITranslate = { eng: 'sum', rus: 'Сумма', kr: 'Summa', en: 'Sum' };
export const START_TIME: ITranslate = {
  eng: 'start_time',
  rus: 'Начало',
  kr: 'Baslaniwi',
  en: 'Start time',
};
export const END_TIME: ITranslate = {
  eng: 'end_time',
  rus: 'Конец',
  kr: 'Tamamlaniwi',
  en: 'End time',
};
export const ROOM_ID: ITranslate = { eng: 'room_id', rus: 'Кабинет', kr: 'Xana', en: 'Room' };
export const TEACHER_ID: ITranslate = {
  eng: 'teacher_id',
  rus: 'Учитель',
  kr: 'Mugalim',
  en: 'Teacher',
};
export const TEACHER_NAME: ITranslate = {
  eng: 'teacher_name',
  rus: 'Учитель',
  kr: 'Mugalim',
  en: 'Teacher',
};
export const COURSE_ID: ITranslate = { eng: 'course_id', rus: 'Курс', kr: 'Kurs', en: 'Course' };
export const COURSE_NAME: ITranslate = {
  eng: 'course_name',
  rus: 'Курс',
  kr: 'Kurs',
  en: 'Course',
};
export const TYPE: ITranslate = { eng: 'type', rus: 'Тип', kr: 'Toylem turi', en: 'Type' };
export const GROUP_ID: ITranslate = { eng: 'group_id', rus: 'Группа', kr: 'Gruppa', en: 'Group' };
export const GROUP_NAME: ITranslate = {
  eng: 'group_name',
  rus: 'Группа',
  kr: 'Gruppa',
  en: 'Group',
};
export const COMMENT: ITranslate = {
  eng: 'comment',
  rus: 'Комментарии',
  kr: 'Komment',
  en: 'Comment',
};
export const GENDER: ITranslate = { eng: 'gender', rus: 'Пол', kr: 'Jinsi', en: 'Gender' };
export const TIME_ID: ITranslate = { eng: 'time_id', rus: 'Время', kr: 'Waqti', en: 'Time' };
export const LEAD_ID: ITranslate = { eng: 'lead_id', rus: 'Источник', kr: 'Lid', en: 'Lead' };
export const FROM: ITranslate = { eng: 'from', rus: 'Откуда', kr: 'Qay jerden', en: 'From' };
export const PERCENT: ITranslate = {
  eng: 'percent',
  rus: 'Процент %',
  kr: 'Procent %',
  en: 'Percent %',
};
export const STUDENT_NAME: constObj = { eng: 'student_name', rus: 'Имя', kr: 'Ati' };
export const STATUS: ITranslate = { eng: 'status', rus: 'Статус', kr: 'Status', en: 'Status' };
export const CURRENT_LESSON: ITranslate = {
  eng: 'lesson',
  rus: 'Текущий урок',
  kr: 'Sabaq',
  en: 'Lesoon',
};
export const WAIT_NAME: ITranslate = { eng: 'Wait', rus: 'Ожидание', kr: 'Kutiw', en: 'Wait' };
export const ADD_BTN: constObj = { eng: 'Add', rus: 'Добавить', kr: 'Qosiw' };
export const TEACHERS: constObj = { eng: 'Teachers', rus: 'Учителья', kr: 'Mugalimler' };
export const GROUPS: constObj = { eng: 'Groups', rus: 'Группы', kr: 'Gruppalar' };
export const PAYMENT_BTN: constObj = { eng: 'Payment', rus: 'Оплатить', kr: 'Toylew' };
export const STUDENTS: constObj = { eng: 'Students', rus: 'Студенты', kr: 'Studentler' };
export const STATISTICS: constObj = { eng: 'Statistics', rus: 'Статистики', kr: 'Statistika' };
export const STATISTICS_STUDENTS: constObj = {
  eng: 'Statistics of students',
  rus: 'Статистика студентов',
  kr: 'Studentlerdin statistikasi',
};
export const STATISTICS_FINANCE: constObj = {
  eng: 'Statistics of finance',
  rus: 'Статистика финансов',
  kr: 'Finans statistiksi',
};
export const STATISTICS_LEADS: constObj = {
  eng: 'Statistics of leads',
  rus: 'Статистика источников',
  kr: 'Lidlar statistikasi',
};
export const PAYMENTS_NAME: constObj = { eng: 'Payments', rus: 'Приход', kr: 'Tusim' };
export const INVALID_LOGIN: constObj = {
  eng: 'Invalid login or password',
  rus: 'Неправельный пароль или логин',
  kr: 'Parol yamasa login qate',
};
export const LOGIN: constObj = {
  eng: 'Log in',
  rus: 'Вход',
  kr: 'Kiriw',
};
export const FORGOT_PASSWORD: constObj = {
  eng: 'Forgot password?',
  rus: 'Забилы пароль?',
  kr: 'Paroldi umittinizba?',
};
export const TIME_TABLE: constObj = {
  eng: 'Timetable',
  rus: 'Расписание',
  kr: 'Raspisanie',
};
export const EXPENSES: constObj = {
  eng: 'Expenses',
  rus: 'Расход',
  kr: 'Shigim',
};
export const EMPLOYEES: constObj = {
  eng: 'Employees',
  rus: 'Сотридники',
  kr: 'Jumisshilar',
};
export const COURSES: constObj = {
  eng: 'Courses',
  rus: 'Курсы',
  kr: 'Kurslar',
};
export const FINANCE: constObj = {
  eng: 'Finance',
  rus: 'Финанс',
  kr: 'Finans',
};
export const SETTINGS: constObj = {
  eng: 'Settings',
  rus: 'Настройки',
  kr: 'Sazlamalar',
};
export const CONTROL: constObj = {
  eng: 'Control',
  rus: 'Контроль',
  kr: 'Basqarma',
};
export const MAIN: constObj = {
  eng: 'Main',
  rus: 'Главная',
  kr: 'Bas bet',
};
export const NAME_OF_COURSE: constObj = {
  eng: 'Name of course',
  rus: 'Название курса',
  kr: 'Kurs ati',
};
export const NAME_OF_GROUP: constObj = {
  eng: 'Name of group',
  rus: 'Название группы',
  kr: 'Gruppa ati',
};
export const START_COURSE: constObj = {
  eng: 'Course start date',
  rus: 'Начало дата курса',
  kr: 'Kurstin baslangan sanesi',
};
export const END_COURSE: constObj = {
  eng: 'Course end date',
  rus: 'Конец дата курса',
  kr: 'Kurstin tamamlangan sanesi',
};
export const WAS_IN_CLASS: constObj = {
  eng: 'Was in class?',
  rus: 'Была на уроке?',
  kr: 'Sabaqta boldima?',
};
export const NO: constObj = {
  eng: 'No',
  rus: 'Нет',
  kr: 'Yaq',
};
export const YES: constObj = {
  eng: 'Yes',
  rus: 'Да',
  kr: 'Awa',
};
export const CANCEL: constObj = {
  eng: 'Cancel?',
  rus: 'Отменить?',
  kr: 'Biykar qiliw?',
};
export const WHAT_DAYS: constObj = {
  eng: 'What days',
  rus: 'Какие дни',
  kr: 'Qaysi kunler',
};
export const ODD_DAYS: constObj = {
  eng: 'Odd',
  rus: 'Нечетные',
  kr: 'Taq kunler',
};
export const EVEN_DAYS: constObj = {
  eng: 'Even',
  rus: 'Четные',
  kr: 'Jup kunler',
};
export const ALL_DAYS: constObj = {
  eng: 'All days',
  rus: 'Все дни',
  kr: 'Hamme kunler',
};
export const MONTH: constObj = {
  eng: 'Month',
  rus: 'Месяц',
  kr: 'Ay',
};
export const GENERAL: constObj = {
  eng: 'General',
  rus: 'Общий',
  kr: 'Uliwma',
};
export const MENU: constObj = {
  eng: 'Menu',
  rus: 'Меню',
  kr: 'Menyu',
};
export const NUMBER_OF_LESSONS: constObj = {
  eng: 'Number of lessons',
  rus: 'Число уроков',
  kr: 'Sabaqlar sani',
};
export const BALANCE: ITranslate = {
  eng: 'debt',
  rus: 'Баланс',
  kr: 'Balans',
  en: 'Balance',
};

export const DISCOUNT_BTN: constObj = {
  eng: 'Discounts',
  rus: 'Скидка',
  kr: 'Shegirme',
};
