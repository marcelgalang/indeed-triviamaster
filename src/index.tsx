import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import Global from './styles/global';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Global />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
