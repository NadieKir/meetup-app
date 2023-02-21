import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { ErrorFallback, Header } from 'components';

import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
};
