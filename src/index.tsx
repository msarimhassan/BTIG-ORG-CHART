import React from 'react';
import { ConfigProvider } from 'antd';
import { MsalProvider } from '@azure/msal-react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import publicClientApplication from './configuration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={publicClientApplication}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1388c9",
              colorSuccess: "#00c78b",
              colorWarning: "#f8bf00",
              colorError: "#f25a0e",
              colorInfo: "#00b1cd",
              wireframe: false,
              borderRadius: 2,
            },
          }}
        >
          <App />
        </ConfigProvider>
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
