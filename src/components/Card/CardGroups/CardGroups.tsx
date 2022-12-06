import { Card, Typography } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ICourseData } from '../../../types/Courses';
import { IGroupData } from '../../../types/Groups';
import { GROUPS } from '../../../helpers/constants/routes';
import styles from './CardGroups.module.scss';
import { ITeacherGroups } from './../../../types/Teachers';

interface ICardGroupProps {
  data: IGroupData[] | ICourseData[] | ITeacherGroups[] | undefined;
  isLoading: boolean;
  title: string;
}

const CardGroup: FC<ICardGroupProps> = ({ data, isLoading, title }) => {
  console.log(data);
  return (
    <Card title={title} bordered={false} loading={isLoading} className={styles.card}>
      {data?.map((item) => {
        return (
          <Typography key={item.id}>
            <NavLink to={`${GROUPS}/${item.id}`}>{item.name}</NavLink>
          </Typography>
        );
      })}
    </Card>
  );
};

export default CardGroup;
