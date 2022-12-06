import { Pie } from '@ant-design/charts';
import { FC } from 'react';
import { ILeadStatistics } from '../../../types/Statistics';

interface PieStatisticsProps {
  data: ILeadStatistics[];
}

const PieStatistics: FC<PieStatisticsProps> = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'lead',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return <Pie {...config} />;
};

export default PieStatistics;
