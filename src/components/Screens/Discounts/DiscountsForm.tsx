import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  COMMENT,
  END_DATE,
  GROUP_ID,
  PERCENT,
  PRICE,
  START_DATE,
  SUM,
} from '../../../helpers/constants/form';
import {
  configDate,
  dateFormat,
  groupConfig,
  paymentConfig,
  percentConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createDiscount, createDiscountProps } from '../../../store/thunks/discountsThunk';
import { IGroupData } from '../../../types/Groups';
import { discountsSlice } from './../../../store/slices/discountsSlice';

interface IDiscountsFormProps {
  student_id: number | undefined;
  groups: IGroupData[] | undefined;
}

const DiscountsForm: FC<IDiscountsFormProps> = ({ student_id, groups }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.discountsReducer);
  const { setDiscountModal } = discountsSlice.actions;
  const { setCount } = discountsSlice.actions;

  const onHandleCreate = async (values: createDiscountProps) => {
    dispatch(setDiscountModal(false));
    const createDiscountsValues = {
      name: values.name,
      student_id: student_id,
      price: values.price ? values.price : 0,
      percent: values.percent ? values.percent : 0,
      start_date: (values.start_date as moment.Moment).format(dateFormat),
      end_date: (values.end_date as moment.Moment).format(dateFormat),
      comment: values.comment,
      course_ids: values.course_ids,
    };
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
        <Form.Item label="Тип скидки" name="name">
          <Select placeholder="Пожалуйста выберите время">
            <Select.Option value="multigroup">Для всех групп группы</Select.Option>
            <Select.Option value="family">Семья</Select.Option>
            <Select.Option value="simple">Обычная скидка</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name}
        >
          {({ getFieldValue }) =>
            getFieldValue('name') === 'multigroup' ? (
              <Form.Item label={translate('percent')} name={PERCENT.eng} {...percentConfig}>
                <InputNumber
                  formatter={(value) => `${value}%`}
                  parser={(value) => value!.replace('%', '')}
                />
              </Form.Item>
            ) : (
              <Form.Item label={translate('sum')} name={PRICE.eng} {...paymentConfig}>
                <InputNumber
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '200px' }}
                />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item label={translate('startDate')} name={START_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label={translate('endDate')} name={END_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item name={'course_ids'} label={translate('group')} {...groupConfig}>
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
