import { Button, Drawer, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import {
  COURSE_ID,
  CREATE,
  getCreateName,
  getEditName,
  LEAD_ID,
  NAME,
  PHONE,
  SURNAME,
  TIME_ID,
} from '../../../helpers/constants/form';
import { genderItems } from '../../../helpers/constants/gender';
import {
  genderConfig,
  leadConfig,
  nameConfig,
  numberConfig,
  surnameConfig,
  timeConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { waitSlice } from '../../../store/slices/waitSlice';
import { createWait, updateWait } from '../../../store/thunks/waitThunk';
import { ICourseData } from '../../../types/Courses';
import { ILead } from '../../../types/Lead';
import { ITime } from '../../../types/Time';
import { IWaitData } from '../../../types/Wait';
import { GENDER } from './../../../helpers/constants/form';
import { IGenderItems } from './../../../helpers/constants/gender';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const WaitForm = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [phoneValue, setPhoneValue] = useState<string | undefined>('+998');
  const { form: waitForm } = useAppSelector((state) => state.waitReducer);
  const { time } = useAppSelector((state) => state.timeReducer);
  const { lead } = useAppSelector((state) => state.leadReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setResetFormWait } = waitSlice.actions;
  const { setCount } = countSlice.actions;
  const { setModal } = modalSlice.actions;

  const onHandleCreate = async (values: IWaitData) => {
    dispatch(setModal(false));
    if (status === CREATE) {
      await dispatch(createWait({ ...values, from: 'office' }));
    } else {
      await dispatch(
        updateWait({
          id: waitForm.id,
          from: 'office',
          ...values,
        })
      );
    }
    dispatch(setCount(1));
    dispatch(setResetFormWait());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormWait());
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const fullName = waitForm.name.split(' ');
    form.setFieldsValue({
      name: fullName[0],
      surname: fullName[1],
      phone: waitForm.phone,
      time_id: waitForm.time_id,
      gender: waitForm.gender,
      course_id: waitForm.course_id,
      lead_id: waitForm.lead_id,
    });
  }, [form, waitForm]);

  return (
    <Drawer
      visible={modal}
      onClose={onClose}
      title={status === CREATE ? getCreateName(translate('wait')) : getEditName(translate('wait'))}
      width={500}
      getContainer={false}
      forceRender
    >
      <Form
        form={form}
        name="waitForm"
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
            // limitMaxLength={10}
          />
        </Form.Item>

        <Form.Item name={TIME_ID.eng} label={translate('time')} {...timeConfig}>
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

        <Form.Item name={GENDER.eng} label={translate('gender')} {...genderConfig}>
          <Select placeholder="Пожалуйста выберите пол">
            {genderItems.map((item: IGenderItems) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name={COURSE_ID.eng} label={translate('course')} rules={[{ required: true }]}>
          <Select placeholder="Пожалуйста выберите курс">
            {courses.data.map((item: ICourseData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name={LEAD_ID.eng} label={translate('lead')} {...leadConfig}>
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
            {translate('addBtn')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default WaitForm;
