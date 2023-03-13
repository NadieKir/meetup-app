import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {
  InternationalizationProvider,
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
    <InternationalizationProvider>
      <LoginProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </LoginProvider>
    </InternationalizationProvider>
  </React.StrictMode>,
);

reportWebVitals();
