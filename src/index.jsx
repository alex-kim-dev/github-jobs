import '@helpers/wdyr';

import store from '@store';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';

import mswWorker from './__mocks__/jobsApi/browser';
import App from './App';
import { baseurl } from './siteMeta';

mswWorker.start({
  onUnhandledRequest: 'bypass',
  quiet: process.env.NODE_ENV !== 'development',
  serviceWorker: {
    url: `${
      process.env.NODE_ENV !== 'development' ? baseurl : ''
    }/mockServiceWorker.js`,
  },
});

ReactDOM.render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root'),
);
