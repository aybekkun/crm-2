import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { createWait } from '../../store/thunks/waitThunk';
import { ILead } from '../../types/Lead';
import { ITime } from '../../types/Time';
import { IWaitData } from '../../types/Wait';
import styles from './SignCourse.module.scss';
import { genderItems, IGenderItems } from './../../helpers/constants/gender';

const SignCourse = () => {
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.timeReducer);
  const { lead } = useAppSelector((state) => state.leadReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const [value, setValue] = useState<string | undefined>('+998');

  const onHandleCreate = async (values: IWaitData) => {
    await dispatch(createWait({ ...values, from: 'lead_form' }));
  };

  return (
    <div className={styles.sign}>
      <Form
        name="signCourse"
        layout="vertical"
        onFinish={onHandleCreate}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста напишите имя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="surname"
          rules={[{ required: true, message: 'Пожалуйста напишите фамилию!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Телефон номер"
          name="phone"
          rules={[{ required: true, message: 'Пожалуйста напишите телефон!' }]}
        >
          <PhoneInput international value={value} onChange={setValue} defaultCountry="UZ" />
        </Form.Item>

        <Form.Item name="time_id" label="Время" rules={[{ required: true }]}>
          <Select placeholder="Пожалуйста выберите время">
            {time?.data.map((item: ITime) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
          <Select placeholder="Пожалуйста выберите статус">
            {genderItems.map((item: IGenderItems) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="course_id" label="Курс" rules={[{ required: true }]}>
          <Select placeholder="Пожалуйста выберите курс">
            {courses.data.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name="lead_id" label="Источник" rules={[{ required: true }]}>
          <Select placeholder="Пожалуйста выберите источник">
            {lead?.data.map((item: ILead) => {
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
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignCourse;
