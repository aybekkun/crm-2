import { PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { FC } from 'react';
import styles from './StudentAddBtn.module.scss';
import { getCreateName } from '../../../helpers/constants/form';

interface OnHandleCreateStudentProps {
  record: RecordProps;
  onHandleCreateStudent: ({ id, name, surname, phone }: RecordProps) => void;
}

export interface RecordProps {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  group_ids?: number[];
}

const StudentAddBtn: FC<OnHandleCreateStudentProps> = ({ onHandleCreateStudent, record }) => {
  return (
    <Tooltip title={getCreateName('студента')}>
      <Typography.Link
        onClick={() =>
          onHandleCreateStudent({
            id: record.id,
            name: record.name,
            surname: record.surname,
            phone: record.phone,
            group_ids: record.group_ids,
          })
        }
      >
        <PlusCircleOutlined className={styles.addBtn} />
      </Typography.Link>
    </Tooltip>
  );
};

export default StudentAddBtn;
