import { CommentOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { useAppDispatch } from '../../../../helpers/hooks/redux';
import { waitSlice } from '../../../../store/slices/waitSlice';
import styles from './CommentBtn.module.scss';

const CommentBtn = ({ id }: { id: number | undefined }) => {
  const dispatch = useAppDispatch();
  const { setIdWait } = waitSlice.actions;
  const { setCommentModal } = waitSlice.actions;

  const onHandleClick = () => {
    dispatch(setCommentModal(true));
    dispatch(setIdWait(id));
  };

  return (
    <Tooltip title="Коммент">
      <Typography.Link onClick={onHandleClick}>
        <CommentOutlined className={styles.commentBtn} />
      </Typography.Link>
    </Tooltip>
  );
};

export default CommentBtn;
