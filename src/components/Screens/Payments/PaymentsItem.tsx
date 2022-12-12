import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';
import { IPaymentData } from '../../../types/Payments';
import { ACTION, COMMENT, DATE, GROUP_NAME, SUM, TYPE } from '../../../helpers/constants/form';
import { splitNum } from '../../../helpers/utils/splitSum';
import ReturnPaymentBtn from '../../Buttons/ReturnPaymentBtn/ReturnPaymentBtn';
import { IPaymentsForm } from './../../../types/Payments';
import { useTranslation } from 'react-i18next';

interface IPaymentsItemProps {
  item?: IPaymentData[];
  isLoading: boolean;
  onReturnPayment?: (obj: IPaymentsForm) => void;
}

const PaymentsItem: FC<IPaymentsItemProps> = ({ item, isLoading, onReturnPayment }) => {
  const { t: translate } = useTranslation();

  const studentDetailColumns: ColumnsType<IPaymentData> = [
    {
      title: translate('name'),
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: translate('group'),
      dataIndex: GROUP_NAME.eng,
      key: GROUP_NAME.eng,
    },
    {
      title: translate('sum'),
      dataIndex: SUM.eng,
      key: SUM.eng,
      render: (_, record) => <div>{splitNum(record.sum)}</div>,
    },
    {
      title: translate('date'),
      dataIndex: DATE.eng,
      key: DATE.eng,
    },
    {
      title: translate('type'),
      dataIndex: TYPE.eng,
      key: TYPE.eng,
    },
    {
      title: translate('comment'),
      dataIndex: COMMENT.eng,
      key: COMMENT.eng,
    },
    {
      title: translate('action'),
      dataIndex: '',
      key: 'x',
      width: '15%',
      render: (_, record) => (
        <div key={record.id}>
          {onReturnPayment ? (
            <ReturnPaymentBtn
              onReturnBtn={onReturnPayment}
              record={record}
              title={'Возврат взноса'}
            />
          ) : (
            ''
          )}
        </div>
      ),
    },
  ];
  return (
    <Table
      dataSource={item}
      columns={studentDetailColumns}
      style={{ marginTop: 20 }}
      pagination={false}
      loading={isLoading ? true : false}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default PaymentsItem;
