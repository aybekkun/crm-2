import Table, { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';
import { ILead } from '../../../../../types/Lead';
import { IRooms } from '../../../../../types/Rooms';
import { ITime } from '../../../../../types/Time';

interface IControlTableProps {
  columns: ColumnsType<IRooms | ITime | ILead>;
  data: IRooms[] | ITime[] | ILead[] | undefined;
  isLoading: boolean;
}

const ControlTable: FC<IControlTableProps> = ({ columns, data, isLoading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={isLoading ? true : false}
      style={{ marginTop: 10 }}
      rowKey={(record) => record.id as React.Key}
    />
  );
};

export default ControlTable;
