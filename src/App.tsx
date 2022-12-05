import { FC, useState, useEffect } from 'react';
import Home from './pages/home';
import { ApiContext, NodeContext, AuthContext, LoaderContext } from './context';
import publicClientApplication from './configuration';
import { configuration } from './configuration';
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

    const a: any = response.idTokenClaims;
    localStorage.setItem('org-token', response.accessToken);
    localStorage.setItem('org-user', JSON.stringify({ role: a.roles[0] }));
    logMessage(`${a.preferred_username} login into the app`);
    setToken(response.accessToken);
    setActiveUser({ role: a.roles[0] });
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
