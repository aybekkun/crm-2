import { DualAxes } from '@ant-design/charts';
import { FC } from 'react';
import { IFinanceStatistics, IStudentsStatistics } from '../../../types/Statistics';

interface DualStatisticsProps {
  data: IStudentsStatistics[] | IFinanceStatistics[];
  yField: string[];
}

const DualStatistics: FC<DualStatisticsProps> = ({ data, yField }) => {
  const config = {
    data: [data, data],
    xField: 'date',
    yField: yField,
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DualStatistics;
