import { PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { useAppDispatch } from '../../../../helpers/hooks/redux';
import { studentsSlice } from '../../../../store/slices/studentsSlice';
import styles from './AddToGroupBtn.module.scss';

const AddToGroupBtn = () => {
  const dispatch = useAppDispatch();
  // const { setIdWait } = waitSlice.actions;
  const { setAddToGroupModal } = studentsSlice.actions;

  const onHandleClick = () => {
    dispatch(setAddToGroupModal(true));
    // dispatch(setIdWait(id));
  };
  return (
    <Tooltip title="Добавить в группу">
      <Typography.Link onClick={onHandleClick}>
        <PlusCircleOutlined className={styles.addToGroupBtn} />
      </Typography.Link>
    </Tooltip>
  );
};

export default AddToGroupBtn;
