import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { BIRTHDAY, CREATE, getEditName, NAME, PASSWORD } from '../../../helpers/constants/form';
import {
  addressConfig,
  dateFormat,
  groupConfig,
  nameConfig,
  numberConfig,
  passwordConfig,
  startTimeConfig,
  surnameConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { studentsSlice } from '../../../store/slices/studentsSlice';
import { createStudent, updateStudent } from '../../../store/thunks/studentsThunk';
import { deleteWait } from '../../../store/thunks/waitThunk';
import { IStudentsForm } from '../../../types/Students';
import { ADDRESS, getCreateName, PHONE, SURNAME } from '../../../helpers/constants/form';
import { countSlice } from './../../../store/slices/countSlice';
import { useParams } from 'react-router-dom';
import { START_DATE } from './../../../helpers/constants/form';
import { useTranslation } from 'react-i18next';

const StudentsForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { form: studentForm, modal } = useAppSelector((state) => state.studentsReducer);
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setModalStudents, setResetFormStudents } = studentsSlice.actions;
  const { setCount } = countSlice.actions;

  const [value, setValue] = useState<string | undefined>('+998');

  const onHandleCreate = async (values: IStudentsForm) => {
    const sendValues = {
      ...values,
      birthday: values.birthday ? (values['birthday'] as moment.Moment).format(dateFormat) : '',
      // start_date: values.start_date
      //   ? (values['start_date'] as moment.Moment).format(dateFormat)
      //   : '',
    };
    if (status === CREATE) {
      await dispatch(createStudent(sendValues));
      dispatch(deleteWait(studentForm.id as number));
    } else {
      await dispatch(
        updateStudent({
          id: studentForm.id,
          ...values,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setModalStudents(false));
    dispatch(setResetFormStudents());
  };

  const onClose = () => {
    dispatch(setModalStudents(false));
    dispatch(setResetFormStudents());
  };

  useEffect(() => {
    const fullName = studentForm.name.split(' ');
    const dateObj = new Date(studentForm.birthday as string);
    const momentObj = moment(dateObj, dateFormat);
    const filter = groups.data.filter((item) => item.id === Number(id));

    form.setFieldsValue({
      name: fullName[0],
      surname: fullName[1],
      phone: studentForm.phone,
      birthday: studentForm.birthday ? momentObj : '',
      start_date: studentForm.birthday ? momentObj : '',
      address: studentForm.address,
      password: studentForm.password,
      group_ids: id ? [filter[0]?.id] : studentForm.group_ids,
    });
  }, [form, groups.data, id, studentForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={
        status === CREATE ? getCreateName(translate('student')) : getEditName(translate('student'))
      }
      width={500}
    >
      <Form
        form={form}
        name="studentForm"
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
          <PhoneInput international value={value} onChange={setValue} defaultCountry="UZ" />
        </Form.Item>

        <Form.Item name="group_ids" label={translate('groups')} {...groupConfig}>
          <Select placeholder="Пожалуйста выберите группу" mode="multiple">
            {groups.data.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/* <Form.Item label={translate('startDate')} name={START_DATE.eng} {...startTimeConfig}>
          <DatePicker format={dateFormat} />
        </Form.Item> */}

        <Form.Item
          label={translate('birthday')}
          name={BIRTHDAY.eng}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('address')} name={ADDRESS.eng} {...addressConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('password')} name={PASSWORD.eng} {...passwordConfig}>
          <Input />
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

export default StudentsForm;
