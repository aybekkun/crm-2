import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select, SelectProps } from 'antd';
import moment from 'moment';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COMMENT, END_DATE, START_DATE } from '../../../helpers/constants/form';
import {
  configDate,
  dateFormat,
  groupConfig,
  paymentConfig,
} from '../../../helpers/constants/validateMessages';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { createDiscount, createDiscountProps } from '../../../store/thunks/discountsThunk';
import { IGroupData } from '../../../types/Groups';
import { discountsSlice } from './../../../store/slices/discountsSlice';

interface IDiscountsFormProps {
  student_id: number | undefined;
  groups: IGroupData[] | undefined;
}

const DiscountsForm: FC<IDiscountsFormProps> = ({ student_id = 0, groups }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.discountsReducer);
  const { setDiscountModal } = discountsSlice.actions;
  const { setCount } = discountsSlice.actions;
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  // useEffect(() => {
  //   (async function () {
  //     await dispatch(fetchFamily(''));
  //   })();
  // }, []);

  const onHandleCreate = async (values: createDiscountProps) => {
    dispatch(setDiscountModal(false));

    const createDiscountsValues = {
      student_id: student_id,
      sum: values.sum ? values.sum : 0,
      start_date: (values.start_date as moment.Moment).format(dateFormat),
      end_date: (values.end_date as moment.Moment).format(dateFormat),
      comment: values.comment ? values.comment : 'Нет комментарий',
      group_id: values.group_id,
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
        <Form.Item label={translate('sum')} name={'sum'} {...paymentConfig}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
        </Form.Item>

        <Form.Item name={'group_id'} label={translate('group')} {...groupConfig}>
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
