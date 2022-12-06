import { Button, Drawer, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { COMMENT } from '../../../helpers/constants/form';
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/redux';
import { waitSlice } from '../../../store/slices/waitSlice';
import { useTranslation } from 'react-i18next';
import { updateWait } from '../../../store/thunks/waitThunk';
import { countSlice } from '../../../store/slices/countSlice';

function AddComment() {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { setCommentModal } = waitSlice.actions;
  const { setCount } = countSlice.actions;
  const { idWait, commentModal } = useAppSelector((state) => state.waitReducer);

  const onHandleCreateComment = async (value: { comment: string }) => {
    dispatch(setCommentModal(false));
    await dispatch(
      updateWait({
        id: idWait,
        comment: value.comment,
      })
    );
    dispatch(setCount(1));
  };

  const onClose = () => {
    dispatch(setCommentModal(false));
  };

  return (
    <Drawer
      visible={commentModal}
      onClose={onClose}
      title="Добавить комментарии"
      width={500}
      getContainer={false}
      forceRender
    >
      <Form
        name="waitForm"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onHandleCreateComment}
        autoComplete="off"
      >
        <Form.Item label={translate('name')} name={COMMENT.eng}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('addBtn')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AddComment;
