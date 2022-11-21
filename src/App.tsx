import { FC, useState, useEffect } from 'react';
import Home from './pages/home';
import { ApiContext, NodeContext, AuthContext, LoaderContext } from './context';

import { Urls } from './common';
import { Route, Routes } from 'react-router-dom';
import { Loader, Navbar } from './components';

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
                            <div className='welcome-box'>
                                <h1>Welcome to the Organization Chart</h1>
                            </div>
                        )}
                    </NodeContext.Provider>
                </ApiContext.Provider>
            </LoaderContext.Provider>
        </AuthContext.Provider>
    );
};

export default App;
