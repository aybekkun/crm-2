import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select, SelectProps } from 'antd';
import moment from 'moment';
import { FC, useState, useEffect } from 'react';
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
import {
  createDiscount,
  createDiscountProps,
  fetchFamily,
} from '../../../store/thunks/discountsThunk';
import { IGroupData } from '../../../types/Groups';
import { discountsSlice } from './../../../store/slices/discountsSlice';

interface IDiscountsFormProps {
  student_id: number | undefined;
  groups: IGroupData[] | undefined;
}

const DiscountsForm: FC<IDiscountsFormProps> = ({ student_id = 0, groups }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { modal, family } = useAppSelector((state) => state.discountsReducer);
  const { setDiscountModal } = discountsSlice.actions;
  const { setCount } = discountsSlice.actions;
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  // useEffect(() => {
  //   (async function () {
  //     await dispatch(fetchFamily(''));
  //   })();
  // }, []);

  const handleSearch = async (newValue: string) => {
    if (newValue) {
      await dispatch(fetchFamily(newValue));
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const onHandleCreate = async (values: createDiscountProps) => {
    dispatch(setDiscountModal(false));
    const student_ids = values.relative ? [student_id, ...values.relative] : [student_id];
    console.log(values.relative);

    const createDiscountsValues = {
      name: values.name,
      student_id: student_ids,
      price: values.price ? values.price : 0,
      start_date: (values.start_date as moment.Moment).format(dateFormat),
      end_date: '',
      comment: values.comment ? values.comment : 'Нет комментарий',
      group_id: values.group_id ? values.group_id : null,
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

        <Form.Item label={translate('sum')} name={PRICE.eng} {...paymentConfig}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '200px' }}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name}
        >
          {({ getFieldValue }) =>
            getFieldValue('name') === 'family' ? (
              <Form.Item label="Родственники" name="relative">
                <Select
                  mode="multiple"
                  showSearch
                  value={value}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                  options={(family.length > 0 ? family : []).map((d) => ({
                    value: d.student_id,
                    label: `${d.surname} ${d.name}`,
                  }))}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name}
        >
          {({ getFieldValue }) =>
            getFieldValue('name') === 'multigroup' ? (
              <Form.Item name={'group_id'} label={translate('group')} {...groupConfig}>
                <Select placeholder="Пожалуйста выберите группу" mode="multiple">
                  {groups?.map((item: IGroupData) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item label={translate('startDate')} name={START_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item>

        {/*   <Form.Item label={translate('endDate')} name={END_DATE.eng} {...configDate}>
          <DatePicker format={dateFormat} />
        </Form.Item> */}

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
