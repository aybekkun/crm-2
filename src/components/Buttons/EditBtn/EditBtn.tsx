import { EditOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import styles from './EditBtn.module.scss';

interface EditBtnProps<T> {
  onEditBtn: (obj: T) => void;
  record: T;
  title: string;
}

function EditBtn<T>({ onEditBtn, record, title }: EditBtnProps<T>) {
  return (
    <Tooltip title={title}>
      <Typography.Link onClick={() => onEditBtn(record)}>
        <EditOutlined className={styles.editBtn} />
      </Typography.Link>
    </Tooltip>
  );
}

export default EditBtn;
