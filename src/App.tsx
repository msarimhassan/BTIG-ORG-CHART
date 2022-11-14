import { FC, useState } from 'react';
import Home from './pages/home';
import { ApiContext } from './context';

import { Urls } from './common';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
    const [apiCall, setApiCall] = useState<boolean>(false);
    return (
        <ApiContext.Provider value={{ apiCall, setApiCall }}>
            <Routes>
                <Route path={Urls.Home} element={<Home />} />
            </Routes>
        </ApiContext.Provider>
    );
};

export default App;
