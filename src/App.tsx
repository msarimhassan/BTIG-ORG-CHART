import { FC, useState } from 'react';
import Home from './pages/home';
import { ApiContext, NodeContext } from './context';

import { Urls } from './common';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
    const [apiCall, setApiCall] = useState<boolean>(false);
    const [nodes, setNodes] = useState<any>(null);
    return (
        <ApiContext.Provider value={{ apiCall, setApiCall }}>
            <NodeContext.Provider value={{ nodes, setNodes }}>
                <Routes>
                    <Route path={Urls.Home} element={<Home />} />
                </Routes>
            </NodeContext.Provider>
        </ApiContext.Provider>
    );
};

export default App;
