import { Card, Typography } from 'antd';
import { FC } from 'react';
import { IOneGroupData } from '../../../../../../types/Groups';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface ICardInfoProps {
  data: IOneGroupData;
  isLoading: boolean;
}

const CardInfoRight: FC<ICardInfoProps> = ({ data, isLoading }) => {
  const { t: translate } = useTranslation();
  return (
    <Card bordered={false} style={{ width: 300 }} loading={isLoading}>
      <Typography>
        <Text strong>{translate('startCourse')}: </Text>
        <Text>{data?.start_lesson}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('endCourse')}: </Text>
        <Text>{data?.end_lesson}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('startTime')}: </Text>
        <Text>{data?.start_time}</Text>
      </Typography>

      <Typography>
        <Text strong>{translate('endTime')}: </Text>
        <Text>{data?.end_time}</Text>
      </Typography>
    </Card>
  );
};

export default CardInfoRight;
