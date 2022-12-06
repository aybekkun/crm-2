import { FC } from 'react';
import styles from './PageContainer.module.scss';

interface MyPageContainerProps {
  name?: string;
  children?: JSX.Element | JSX.Element[];
}

const PageContainer: FC<MyPageContainerProps> = ({ name, children }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      {children}
    </div>
  );
};

export default PageContainer;
