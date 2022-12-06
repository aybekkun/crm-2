export const dateFormat = 'YYYY-MM-DD';

export const configDate = {
  rules: [{ type: 'object' as const, required: true, message: 'Пожалуйста укажите дату!' }],
};

export const numberConfig = {
  rules: [
    { required: true, message: 'Пожалуйста напишите номер!' },
    { whitespace: true },
    { min: 13, message: 'Номер должен быть не меньше 13 символов' },
    { max: 13, message: 'Номер должен быть не больше 13 символов' },
  ],
};

export const passwordConfig = {
  rules: [
    { required: false, message: 'Пожалуйста напишите пароль!' },
    { whitespace: true },
    { min: 8, message: 'Пароль должен быть не меньше 8 символов' },
  ],
};

export const nameConfig = {
  rules: [
    { required: true, message: 'Пожалуйста напишите название!' },
    { min: 3, message: 'Имя должен быть не меньше 3 символов' },
  ],
};

export const surnameConfig = {
  rules: [
    { required: true, message: 'Пожалуйста напишите фамилию!' },
    { min: 3, message: 'Фамилия должен быть не меньше 3 символов' },
  ],
};

export const titleConfig = {
  rules: [
    { required: true, message: 'Пожалуйста напишите загаловок!' },
    { min: 3, message: 'Фамилия должен быть не меньше 3 символов' },
  ],
};

export const priceConfig = {
  rules: [{ required: true, message: 'Пожалуйста укажите прайс!' }],
};

export const typeConfig = {
  rules: [{ required: true, message: 'Пожалуйста укажите тип!' }],
};

export const durationConfig = {
  rules: [{ required: true, message: 'Пожалуйста укажите продолжительность!' }],
};

export const addressConfig = {
  rules: [{ required: false, message: 'Пожалуйста укажите адресс!' }],
};

export const salaryConfig = {
  rules: [{ required: true, message: 'Пожалуйста укажите зарплату!' }],
};

export const roleConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите роль' }],
};

export const teacherConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите учитель' }],
};

export const courseConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите курс' }],
};

export const timeConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите время' }],
};

export const genderConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите пол' }],
};

export const paymentConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите сумму' }],
};

export const leadConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите источник' }],
};

export const groupConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите группу' }],
};

export const percentConfig = {
  rules: [{ required: true, message: 'Пожалуйста укажите процент' }],
};

export const startTimeConfig = {
  rules: [{ required: true, message: 'Пожалуйста напишите начало времени!' }],
};

export const endTimeConfig = {
  rules: [{ required: true, message: 'Пожалуйста напишите конец времени!' }],
};

export const startDateConfig = {
  rules: [{ required: true, message: 'Пожалуйста напишите начало даты!' }],
};

export const studentsConfig = {
  rules: [{ required: true, message: 'Пожалуйста выберите студента!' }],
};
