import { StopOutlined } from '@ant-design/icons';
import { DatePicker, DatePickerProps, Popover, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COMMENT, END_DATE, START_DATE, SUM } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { splitNum } from '../../../helpers/utils/splitSum';
import { IDiscountsData } from '../../../types/Discounts';
import { fetchDiscounts, stopDiscount } from './../../../store/thunks/discountsThunk';
import { discountsSlice } from './../../../store/slices/discountsSlice';

const DiscountsItem = ({ id }: { id: number | undefined }) => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { discounts, count, isLoading } = useAppSelector((state) => state.discountsReducer);
  const { setCount } = discountsSlice.actions;
  const [idDiscount, setIdDiscount] = useState<number>(1);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    dispatch(stopDiscount({ id: idDiscount, end_date: dateString }));
    console.log(dateString);
    dispatch(setCount(1));
  };

  const content = (
    <div>
      <DatePicker onChange={onChange} />
    </div>
  );

  useEffect(() => {
    dispatch(fetchDiscounts(id!));
  }, [dispatch, id, count]);

  const studentDetailColumns: ColumnsType<IDiscountsData> = [
    {
      title: translate('sum'),
      dataIndex: SUM.eng,
      key: SUM.eng,
      render: (_, record) => <div>{splitNum(record.sum)}</div>,
    },
    {
      title: translate('comment'),
      dataIndex: COMMENT.eng,
      key: COMMENT.eng,
    },
    {
      title: translate('startDate'),
      dataIndex: START_DATE.eng,
      key: START_DATE.eng,
    },
    {
      title: translate('endDate'),
      dataIndex: END_DATE.eng,
      key: END_DATE.eng,
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (_, record) => (
        <Popover content={content} title="Остановить скидку" trigger="click">
          <StopOutlined onClick={() => setIdDiscount(record.id)} />
        </Popover>
      ),
    },
  ];
  return (
    <Table
      dataSource={discounts?.data}
      columns={studentDetailColumns}
      style={{ marginTop: 20 }}
      loading={isLoading ? true : false}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default DiscountsItem;
