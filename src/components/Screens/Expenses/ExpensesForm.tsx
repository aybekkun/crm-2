import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DATE, getCreateName, SUM, TITLE } from '../../../helpers/constants/form';
import {
  configDate,
  dateFormat,
  surnameConfig,
  typeConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { expensesSlice } from '../../../store/slices/expensesSlice';
import { fetchEmployees } from '../../../store/thunks/employeesThunk';
import { createExpense } from '../../../store/thunks/expensesThunk';
import { IEmployeeSalary } from '../../../types/Employees';
import { IExpenseData } from '../../../types/Expenses';
import { salaryConfig } from './../../../helpers/constants/validateMessages';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const ExpenseForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [typeSalary, setTypeSalary] = useState<string>('another');
  const [sumSalary, setSumSalary] = useState<string>('');
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { user } = useAppSelector((state) => state.loginReducer);
  const { employeesSalary } = useAppSelector((state) => state.employeesReducer);
  const { setResetFormExpenses } = expensesSlice.actions;
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;

  const onHandleCreate = async (values: IExpenseData) => {
    const salary = employeesSalary.filter((item) => item.employee_id === values.to_id);

    dispatch(setModal(false));
    await dispatch(
      createExpense({
        name: salary[0] ? salary[0].name : null,
        title: values.title,
        type: values.type,
        to_id: values.to_id,
        sum: +values.sum,
        date: values.date,
        user_id: user?.id,
      })
    );
    dispatch(setCount(1));
    dispatch(setResetFormExpenses());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormExpenses());
  };

  const onChangeTypeSalary = (value: string) => {
    setTypeSalary(value);
  };
  const onChangeSumSalary = (value: number) => {
    const salary = employeesSalary.filter((item) => item.employee_id === value);
    setSumSalary(salary[0].salary.toString());
  };

  useEffect(() => {
    form.setFieldsValue({
      sum: sumSalary,
    });
  }, [form, sumSalary]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch(fetchEmployees({ cancelToken: cancelToken.token }));

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={getCreateName(translate('expenses'))}
      width={500}
    >
      <Form
        form={form}
        name="expenses"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreate}
        autoComplete="off"
        initialValues={{
          sum: sumSalary,
        }}
      >
        <Form.Item label={translate('title')} name={TITLE.eng} {...surnameConfig}>
          <Input />
        </Form.Item>

        <Form.Item label={translate('type')} name="type" {...typeConfig}>
          <Select placeholder="Пожалуйста выберите тип" onChange={onChangeTypeSalary}>
            <Select.Option key="1" value="salary">
              Зарплата
            </Select.Option>
            <Select.Option key="2" value="another">
              Другое
            </Select.Option>
          </Select>
        </Form.Item>

        {typeSalary === 'salary' ? (
          <Form.Item label={translate('employees')} name="to_id" {...salaryConfig}>
            <Select placeholder="Пожалуйста выберите работника" onChange={onChangeSumSalary}>
              {employeesSalary.map((item: IEmployeeSalary) => {
                return (
                  <Select.Option key={item.employee_id} value={item.employee_id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          ''
        )}

        <Form.Item label={translate('date')} name={DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('sum')} name={SUM.eng}>
          <InputNumber
            value={sumSalary}
            onChange={setSumSalary}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
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

export default ExpenseForm;
