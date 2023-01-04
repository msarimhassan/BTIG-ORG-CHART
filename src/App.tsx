import { FC, useState, useEffect } from 'react';
import { EventType, InteractionType } from '@azure/msal-browser';

import Home from './pages/home';
import { ApiContext, NodeContext, AuthContext, LoaderContext } from './context';
import publicClientApplication from './configuration';
import { configuration } from './configuration';
import { Loader, Navbar } from './components';
import { logMessage } from './utils';
import { Routes, Route } from 'react-router-dom';

const App: FC = () => {
  const [apiCall, setApiCall] = useState<boolean>(false);
  const [nodes, setNodes] = useState<any>(null);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleLogin = async () => {
      const response: any = await publicClientApplication?.handleRedirectPromise();
      handleResponse(response);
    };
    const token = localStorage.getItem('org-token');
    const user = localStorage.getItem('org-user') || '{}';
    if (token) {
      setToken(token);
      setActiveUser(JSON.parse(user));
    } else {
      handleLogin();
    }
  }, []);

  useEffect(() => {
    publicClientApplication.addEventCallback((message) => {
      switch (message.eventType) {
        case EventType.LOGIN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
          if (message.interactionType === InteractionType.Redirect) {
            handleResponse(message.payload);
          }
      }
    });
  }, []);

  const handleResponse = (response: any) => {
    if (response !== null) {
      localStorage.setItem('org-token', response.accessToken);
      localStorage.setItem('org-user', JSON.stringify({ role: response.idTokenClaims.roles[0] }));
      setToken(response.accessToken);
      setActiveUser({ role: response.idTokenClaims.roles[0] });
      logMessage('User login into the app');

      // Display signed-in user content, call API, etc.
    } else {
      // In case multiple accounts exist, you can select
      const currentAccounts = publicClientApplication.getAllAccounts();

      if (currentAccounts.length === 0) {
        publicClientApplication.loginRedirect({
          scopes: configuration?.scopes,
        });
      } else if (currentAccounts.length > 1) {
        console.log({ currentAccounts });
      } else if (currentAccounts.length === 1) {
        console.log({ currentAccounts });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, token, setToken }}>
      <LoaderContext.Provider value={{ loading, setLoading }}>
        <Loader loading={loading} />
        <ApiContext.Provider value={{ apiCall, setApiCall }}>
          <NodeContext.Provider value={{ nodes, setNodes }}>
            <Navbar />
            <Routes>
              <Route
                path='/*'
                element={
                  token ? (
                    <Home />
                  ) : null
                }
              />
            </Routes>
          </NodeContext.Provider>
        </ApiContext.Provider>
      </LoaderContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;


//  <div
//    style={{
//      display: 'flex',
//      alignItems: 'center',
//      justifyContent: 'center',
//      height: '100vh',
//      flexDirection: 'column',
//    }}
//  >
//    <h1>Login into Org Chart</h1>
//    <button
//      className='login-btn'
//      style={{ marginTop: '10px' }}
//      onClick={() => {
//        handleLogin();
//      }}
//    >
//      Login
//    </button>
//  </div>;