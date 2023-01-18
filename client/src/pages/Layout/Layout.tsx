import { Outlet } from 'react-router-dom';

import { Header } from 'components';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};
