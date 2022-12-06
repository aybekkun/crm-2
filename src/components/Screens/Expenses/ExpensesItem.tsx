import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DATE, NAME, SUM, TITLE } from '../../../helpers/constants/form';
import { splitNum } from '../../../helpers/utils/splitSum';
import { IExpenseData } from '../../../types/Expenses';

interface IExpensesItemProps {
  expenses: IExpenseData[] | undefined;
  isLoading: boolean;
}

const ExpensesItem: FC<IExpensesItemProps> = ({ expenses, isLoading }) => {
  const { t: translate } = useTranslation();
  const expensesColumns: ColumnsType<IExpenseData> = [
    {
      title: translate('name'),
      dataIndex: NAME.eng,
      key: NAME.eng,
      width: '25%',
    },
    {
      title: translate('title'),
      dataIndex: TITLE.eng,
      key: TITLE.eng,
      width: '25%',
    },
    {
      title: translate('date'),
      dataIndex: DATE.eng,
      key: DATE.eng,
      width: '25%',
    },
    {
      title: translate('sum'),
      dataIndex: SUM.eng,
      key: SUM.eng,
      width: '25%',
      render: (_, record) => <div>{splitNum(record.sum)}</div>,
    },
  ];
  return (
    <Table
      columns={expensesColumns}
      dataSource={expenses}
      pagination={false}
      loading={isLoading ? true : false}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default ExpensesItem;
