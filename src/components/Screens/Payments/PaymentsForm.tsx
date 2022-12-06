import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { FC, useEffect } from 'react';
import { paymentsSlice } from '../../../store/slices/paymentsSlice';
import { createPayment } from '../../../store/thunks/paymentsThunk';
import { IGroupData } from '../../../types/Groups';
import { IPaymentData } from '../../../types/Payments';
import { COMMENT, CREATE, DATE, GROUP_ID, SUM, TYPE } from '../../../helpers/constants/form';
import { paymentsTypeItems } from '../../../helpers/constants/payments';
import {
  configDate,
  dateFormat,
  groupConfig,
  paymentConfig,
  timeConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { countSlice } from './../../../store/slices/countSlice';
import { modalSlice } from './../../../store/slices/modalSlice';
import { useTranslation } from 'react-i18next';

interface IPaymentFormProps {
  student_id: number | undefined;
  groups: IGroupData[] | undefined;
}

const PaymentForm: FC<IPaymentFormProps> = ({ student_id, groups }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { error, form: paymentsForm } = useAppSelector((state) => state.paymentsReducer);
  const { modal } = useAppSelector((state) => state.modalReducer);
  const { status } = useAppSelector((state) => state.statusReducer);
  const { setModal } = modalSlice.actions;
  const { setCount } = countSlice.actions;
  const { setResetFormPayments } = paymentsSlice.actions;

  const onHandleCreate = async (values: IPaymentData) => {
    dispatch(setModal(false));
    const createPaymentsValues = {
      ...values,
      student_id: student_id,
      date: (values['date'] as moment.Moment).format(dateFormat),
    };
    console.log(createPaymentsValues);
    const returnPaymentValues = {
      ...values,
      sum: -values.sum,
      student_id: student_id,
      date: (values['date'] as moment.Moment).format(dateFormat),
    };

    if (status === CREATE) {
      await dispatch(createPayment(createPaymentsValues));
    } else {
      await dispatch(createPayment(returnPaymentValues));
    }
    dispatch(setCount(1));
    dispatch(setResetFormPayments());
  };

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setResetFormPayments());
  };

  useEffect(() => {
    const dateObj = new Date(paymentsForm.date as string);
    const momentObj = moment(dateObj, dateFormat);

    form.setFieldsValue({
      sum: paymentsForm.sum,
      date: paymentsForm.date ? momentObj : '',
      type: paymentsForm.type,
      group_id: paymentsForm.group_id,
      comment: paymentsForm.type,
    });
  }, [form, paymentsForm]);

  return (
    <Drawer visible={modal} onClose={onClose} title="Оплатить взнос">
      <Form
        form={form}
        name="paymentsForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        layout="vertical"
        onFinish={onHandleCreate}
        autoComplete="off"
      >
        <Form.Item label={translate('sum')} name={SUM.eng} {...paymentConfig}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
        </Form.Item>

        <Form.Item label={translate('date')} name={DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item name={TYPE.eng} label={translate('type')} {...timeConfig}>
          <Select placeholder="Пожалуйста выберите время">
            {paymentsTypeItems.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item name={GROUP_ID.eng} label={translate('group')} {...groupConfig}>
          <Select placeholder="Пожалуйста выберите группу">
            {groups?.map((item: IGroupData) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label={translate('comment')} name={COMMENT.eng} rules={[{ required: false }]}>
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

export default PaymentForm;
