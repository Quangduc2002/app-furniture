import './styles/tailwind.css';
import './styles/globals.scss';

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import { Toaster } from 'sonner';
import { Provider } from 'jotai';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <Provider>
    <App />
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          right: '10px',
        },
      }}
    />
  </Provider>,
);
