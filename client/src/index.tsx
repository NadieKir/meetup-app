import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {
  LocalizationProvider,
  LoginProvider,
  NotificationsProvider,
} from 'common/contexts';
import reportWebVitals from './reportWebVitals';

import 'style/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <LoginProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </LoginProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);

reportWebVitals();
