import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import {
  BIRTHDAY,
  CREATE,
  getEditName,
  NAME,
  PASSWORD,
  PERCENT,
} from '../../../helpers/constants/form';
import {
  addressConfig,
  configDate,
  courseConfig,
  dateFormat,
  nameConfig,
  numberConfig,
  passwordConfig,
  percentConfig,
  surnameConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { modalSlice } from '../../../store/slices/modalSlice';
import { teachersSlice } from '../../../store/slices/teachersSlice';
import { createTeacher, updateTeacher } from '../../../store/thunks/teachersThunk';
import { ICourseData } from '../../../types/Courses';
import { ITeachersForm } from '../../../types/Teachers';
import { getCreateName, SURNAME, PHONE, ADDRESS } from '../../../helpers/constants/form';
import { countSlice } from './../../../store/slices/countSlice';
import { useTranslation } from 'react-i18next';

const TeachersForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [phoneValue, setPhoneValue] = useState<string | undefined>('+998');
  const { form: teacherForm, error } = useAppSelector((state) => state.teachersReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;
  const { setResetFormTeachers } = teachersSlice.actions;

  const onHandleCreate = async (values: ITeachersForm) => {
    dispatch(setModal(false));
    const sendValues = {
      ...values,
      birthday: (values['birthday'] as moment.Moment).format(dateFormat),
    };
    if (status === CREATE) {
      await dispatch(createTeacher(sendValues));
    } else {
      await dispatch(
        updateTeacher({
          id: teacherForm.id,
          ...sendValues,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setResetFormTeachers());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormTeachers());
  };

  useEffect(() => {
    const fullName = teacherForm.name.split(' ');
    const dateObj = new Date(teacherForm.birthday as string);
    const momentObj = moment(dateObj, dateFormat);

    form.setFieldsValue({
      name: fullName[0],
      surname: fullName[1],
      phone: teacherForm.phone,
      birthday: teacherForm.birthday ? momentObj : '',
      address: teacherForm.address,
      password: teacherForm.password,
      course_ids: teacherForm.course_ids,
    });
  }, [form, teacherForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={
        status === CREATE ? getCreateName(translate('teacher')) : getEditName(translate('teacher'))
      }
      width={500}
    >
      <Form
        form={form}
        name="teacher"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item label={translate('name')} name={NAME.eng} {...nameConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('surname')} name={SURNAME.eng} {...surnameConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('phone')} name={PHONE.eng} {...numberConfig}>
          <PhoneInput
            international
            value={phoneValue}
            onChange={setPhoneValue}
            defaultCountry="UZ"
          />
        </Form.Item>

        <Form.Item label={translate('birthday')} name={BIRTHDAY.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('address')} name={ADDRESS.eng} {...addressConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('password')} name={PASSWORD.eng} {...passwordConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('percent')} name={PERCENT.eng} {...percentConfig}>
          <InputNumber
            formatter={(value) => `${value}%`}
            parser={(value) => value!.replace('%', '')}
          />
        </Form.Item>

        <Form.Item name="course_ids" label={translate('courses')} {...courseConfig}>
          <Select placeholder="Пожалуйста выберите группу" mode="multiple">
            {courses.data.map((item: ICourseData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('addBtn')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default TeachersForm;
