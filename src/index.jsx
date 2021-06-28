import ReactDOM from 'react-dom';

import mswWorker from './apiMock/browser';
import App from './App';
import { StoreProvider } from './store';

mswWorker.start({
  onUnhandledRequest: 'bypass',
  quiet: process.env.NODE_ENV !== 'development',
});

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
