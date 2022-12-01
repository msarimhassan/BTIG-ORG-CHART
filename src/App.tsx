import { FC, useState, useEffect } from 'react';
import Home from './pages/home';
import { ApiContext, NodeContext, AuthContext, LoaderContext } from './context';
import publicClientApplication from './configuration';
import { configuration } from './configuration';
import { Network, Urls, config } from './config';
import { Loader, Navbar } from './components';
import { logMessage } from './utils';

const App: FC = () => {
  const [apiCall, setApiCall] = useState<boolean>(false);
  const [nodes, setNodes] = useState<any>(null);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem('org-token');
    const user = localStorage.getItem('org-user') || '{}';
    if (token) {
      setToken(token);
      setActiveUser(JSON.parse(user));
    }
  }, []);
  const handleLogin = async () => {
    const response = await publicClientApplication?.loginPopup({
      scopes: configuration?.scopes,
      prompt: 'select_account',
    });
    setLoading(true);
    const fetch = await Network.post(Urls.login, response, (await config()).headers);
    setLoading(false);
    localStorage.setItem('org-token', fetch.data.token);
    localStorage.setItem('org-user', JSON.stringify(fetch.data.user));
    logMessage(`${fetch.data.user.name} login into the app`);
    setToken(fetch.data.token);
    setActiveUser(fetch.data.user);
    setApiCall((prevState: any) => !prevState);
  };

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, token, setToken }}>
      <LoaderContext.Provider value={{ loading, setLoading }}>
        <Loader loading={loading} />
        <ApiContext.Provider value={{ apiCall, setApiCall }}>
          <NodeContext.Provider value={{ nodes, setNodes }}>
            <Navbar />
            {token ? (
              <Home />
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                  flexDirection: 'column',
                }}
              >
                <h1>Login into Org Chart</h1>
                <button
                  className='login-btn'
                  style={{ marginTop: '10px' }}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </NodeContext.Provider>
        </ApiContext.Provider>
      </LoaderContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
