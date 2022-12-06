import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
