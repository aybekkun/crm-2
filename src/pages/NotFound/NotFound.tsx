import { Button, Result } from 'antd';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, это страница не работает."
      extra={
        <Button type="primary">
          <NavLink to="/"></NavLink> Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
