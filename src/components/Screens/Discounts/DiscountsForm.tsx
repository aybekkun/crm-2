import { Button, DatePicker, Drawer, Form, Input, InputNumber } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { COMMENT, END_DATE, START_DATE, SUM } from '../../../helpers/constants/form';
import { configDate, dateFormat, paymentConfig } from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createDiscount, createDiscountProps } from '../../../store/thunks/discountsThunk';
import { discountsSlice } from './../../../store/slices/discountsSlice';

interface IDiscountsFormProps {
  student_id: number | undefined;
}

const DiscountsForm: FC<IDiscountsFormProps> = ({ student_id }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.discountsReducer);
  const { setDiscountModal } = discountsSlice.actions;
  const { setCount } = discountsSlice.actions;

  const onHandleCreate = async (values: createDiscountProps) => {
    dispatch(setDiscountModal(false));
    console.log(values);
    const createDiscountsValues = {
      student_id: student_id,
      sum: values.sum,
      start_date: (values.start_date as moment.Moment).format(dateFormat),
      end_date: (values.end_date as moment.Moment).format(dateFormat),
      comment: values.comment,
    };

    console.log(createDiscountsValues);

    await dispatch(createDiscount(createDiscountsValues));
    dispatch(setCount(1));
  };

  const onClose = () => {
    dispatch(setDiscountModal(false));
  };

  return (
    <Drawer visible={modal} onClose={onClose} title="Скидка">
      <Form
        name="discountsForm"
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

        <Form.Item label={translate('startDate')} name={START_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('endDate')} name={END_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('comment')} name={COMMENT.eng}>
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

export default DiscountsForm;
