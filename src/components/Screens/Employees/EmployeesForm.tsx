import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import {
  ADDRESS,
  CREATE,
  getCreateName,
  getEditName,
  NAME,
  PHONE,
} from '../../../helpers/constants/form';
import {
  addressConfig,
  dateFormat,
  nameConfig,
  numberConfig,
  passwordConfig,
  roleConfig,
  salaryConfig,
  surnameConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { employeesSlice } from '../../../store/slices/employeesSlice';
import { IEmployeesForm, IRolesData } from '../../../types/Employees';
import { BIRTHDAY, PASSWORD, ROLE_ID, SALARY, SURNAME } from '../../../helpers/constants/form';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import moment from 'moment';
import { createAdmin, updateAdmin } from './../../../store/thunks/employeesThunk';
import { useTranslation } from 'react-i18next';

const EmployeesForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [phoneValue, setPhoneValue] = useState<string | undefined>('+998');
  const { form: employeeForm, error } = useAppSelector((state) => state.employeesReducer);
  const { roles } = useAppSelector((state) => state.employeesReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setResetFormEmployees } = employeesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: IEmployeesForm) => {
    dispatch(setModal(false));
    const sendValues = {
      ...values,
      birthday: (values['birthday'] as moment.Moment).format(dateFormat),
    };
    if (status === CREATE) {
      await dispatch(createAdmin(sendValues));
    } else {
      await dispatch(
        updateAdmin({
          id: employeeForm.id,
          ...sendValues,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setResetFormEmployees());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormEmployees());
  };

  useEffect(() => {
    const fullName = employeeForm.name.split(' ');
    const dateObj = new Date(employeeForm.birthday as string);
    const momentObj = moment(dateObj, dateFormat);
    form.setFieldsValue({
      name: fullName[0],
      surname: fullName[1],
      phone: employeeForm.phone,
      birthday: employeeForm.birthday ? momentObj : '',
      address: employeeForm.address,
      password: employeeForm.password,
      salary: employeeForm.salary,
      role_id: employeeForm.role_id,
    });
  }, [form, employeeForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={
        status === CREATE
          ? getCreateName(translate('employee'))
          : getEditName(translate('employee'))
      }
      width={500}
    >
      <Form
        form={form}
        name="employee"
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

        <Form.Item label={translate('salary')} name={SALARY.eng} {...salaryConfig}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
        </Form.Item>

        <Form.Item name={ROLE_ID.eng} label={translate('role')} {...roleConfig}>
          <Select placeholder="Пожалуйста выберите роль">
            {roles.map((item: IRolesData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label={translate('birthday')} name={BIRTHDAY.eng}>
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

export default EmployeesForm;
