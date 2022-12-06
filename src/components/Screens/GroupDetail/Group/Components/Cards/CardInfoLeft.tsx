import { Card, Typography } from 'antd';
import { FC } from 'react';
import { IOneGroupData } from '../../../../../../types/Groups';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

interface ICardInfoProps {
  data: IOneGroupData;
  isLoading: boolean;
}

const CardInfoLeft: FC<ICardInfoProps> = ({ data, isLoading }) => {
  const { t: translate } = useTranslation();
  return (
    <Card bordered={false} style={{ width: 300, marginRight: '50px' }} loading={isLoading}>
      <Typography>
        <Text strong>{translate('nameOfGroup')}: </Text>
        <Text>{data?.group_name}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('nameOfCourse')}: </Text>
        <Text>{data?.course_name}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('room')}: </Text>
        <Text>{data?.room_name}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('teacher')}: </Text>
        <Text>{data?.teacher_name}</Text>
      </Typography>
    </Card>
  );
};

export default CardInfoLeft;
