import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { message, Popconfirm, Tooltip } from 'antd';
import React, { FC } from 'react';
import styles from './DeleteBtn.module.scss';

interface DeleteBtnProps {
  onDeleteBtn: (id: number) => void;
  id?: number;
  title: string;
}

const DeleteBtn: FC<DeleteBtnProps> = ({ onDeleteBtn, id, title }) => {
  const confirm = () => {
    onDeleteBtn(id as number);
    message.success('Click on Yes');
  };

  const cancel = () => {
    message.error('Click on No');
  };

  return (
    <Tooltip title={title}>
      <Popconfirm
        title="Вы уверены？"
        onConfirm={confirm}
        onCancel={cancel}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      >
        <DeleteOutlined className={styles.deleteBtn} style={{ color: 'red' }} />
      </Popconfirm>
    </Tooltip>
  );
};

export default DeleteBtn;
