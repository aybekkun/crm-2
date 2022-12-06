import { Button, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ChangeEvent, FC, useState } from 'react';
import { IRooms } from '../../../../types/Rooms';
import { ITime } from '../../../../types/Time';
import { ILead } from './../../../../types/Lead';
import ControlTable from './Components/ControlTable';
import styles from './ControlLayout.module.scss';
import { useTranslation } from 'react-i18next';

interface IControlProps {
  onCreate: (value: string) => void;
  columns: ColumnsType<IRooms>;
  name: string;
  data: IRooms[] | ITime[] | ILead[] | undefined;
  isLoading: boolean;
}

const ControlLayout: FC<IControlProps> = ({ onCreate, columns, name, data, isLoading }) => {
  const [value, setValue] = useState<string>('');
  const { t: translate } = useTranslation();

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.rooms}>
      <h3>{name}</h3>
      <div className={styles.addNew}>
        <Input type="text" value={value} onChange={onChangeValue} />
        <Button
          onClick={() => {
            onCreate(value);
            setValue('');
          }}
          type="primary"
        >
          {translate('addBtn')}
        </Button>
      </div>
      <ControlTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
};

export default ControlLayout;
