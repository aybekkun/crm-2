import { RotateRightOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import styles from './ReturnPaymentBtn.module.scss';

interface ReturnPaymentBtnProps<T> {
  onReturnBtn?: (obj: T) => void;
  record: T;
  title: string;
}

function ReturnPaymentBtn<T>({ onReturnBtn, record, title }: ReturnPaymentBtnProps<T>) {
  return (
    <Tooltip title={title}>
      <Typography.Link
        onClick={() => {
          onReturnBtn ? onReturnBtn(record) : '';
        }}
      >
        <RotateRightOutlined className={styles.returnBtn} />
      </Typography.Link>
    </Tooltip>
  );
}

export default ReturnPaymentBtn;
