import { FC } from 'react';
import { Avatar, Card, Typography } from 'antd';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import DeleteBtn from '../../Buttons/DeleteBtn/DeleteBtn';
import { UserOutlined } from '@ant-design/icons/lib';
import styles from './CardInfo.module.scss';
import { getDeleteName, getEditName } from '../../../helpers/constants/form';
import { ITeacherOneData, ITeachersForm } from '../../../types/Teachers';
import { IStudentData } from '../../../types/Students';
import { IStudentsForm } from './../../../types/Students';
import { useTranslation } from 'react-i18next';
import AddToGroupBtn from '../../Screens/Students/AddToGroupBtn/AddToGroupBtn';

const { Text } = Typography;

interface ICardInfoProps {
  data: ITeacherOneData | IStudentData;
  isLoading: boolean;
  onEdit: (obj: ITeacherOneData | IStudentsForm | ITeachersForm) => void;
  onDelete: (id: number) => void;
}

const CardInfo: FC<ICardInfoProps> = ({ data, isLoading, onDelete, onEdit }) => {
  const { t: translate } = useTranslation();
  return (
    <Card loading={isLoading} className={styles.card}>
      <Avatar size={64} icon={<UserOutlined />} className={styles.avatar} />
      <Typography>
        <Text strong>{translate('name')}: </Text>
        <Text>{data?.name}</Text>
      </Typography>
      <Typography>
        <Text strong>{translate('surname')}: </Text>
        <Text>{data?.surname}</Text>
      </Typography>
      <Typography>
        <Text strong>{translate('phone')}: </Text>
        <Text>{data?.phone}</Text>
      </Typography>
      <Typography>
        <Text strong>{translate('birthday')}: </Text>
        <Text>{data?.birthday}</Text>
      </Typography>
      <Typography>
        <Text strong>{translate('address')}: </Text>
        <Text>{data?.address}</Text>
      </Typography>
      <div className={styles.btnGroup}>
        <AddToGroupBtn />
        <EditBtn title={getEditName(translate('student'))} onEditBtn={onEdit} record={data} />
        <DeleteBtn
          title={getDeleteName(translate('stundet'))}
          id={data?.id}
          onDeleteBtn={onDelete}
        />
      </div>
    </Card>
  );
};

export default CardInfo;
