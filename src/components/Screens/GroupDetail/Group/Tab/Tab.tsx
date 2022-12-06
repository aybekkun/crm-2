import { Tabs } from 'antd';
import { FC } from 'react';
import { monthsName } from '../../../../../helpers/constants/months';

const { TabPane } = Tabs;

interface ITabProps {
  data: string[];
  onChange: (key: string) => void;
}

const Tab: FC<ITabProps> = ({ data, onChange }) => {
  const currentMonth = new Date().getMonth();
  return (
    <Tabs defaultActiveKey={(currentMonth + 1).toString()} onChange={onChange}>
      {data.map((item) => {
        return <TabPane tab={monthsName[+item - 1]} key={item}></TabPane>;
      })}
    </Tabs>
  );
};

export default Tab;
