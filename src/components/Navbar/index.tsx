import { FC } from 'react';
import './Navbar.css';

import { Network, Urls, config } from '../../config';
import useAuth from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import useLoader from '../../hooks/useLoader';
import publicClientApplication from '../../configuration';
import { configuration } from '../../configuration';

const Navbar: FC = () => {
    const { setCredential, token, setToken } = useAuth();
    const { setApiCall } = useApi();
    const { setLoading } = useLoader();
    const handleLogin = async () => {
        const response = await publicClientApplication.loginPopup({
            scopes: configuration.scopes,
            prompt: 'select_account',
        });
        setLoading(true);
        const fetch = await Network.post(Urls.login, response, (await config()).headers);
        setLoading(false);
        setCredential(fetch.data.token, fetch.data.user);
        setApiCall((prevState: any) => !prevState);
    };
    const handleLogout = () => {
        setToken(null);
        localStorage.clear();
        publicClientApplication.logoutPopup();
    };

    return (
        <div className='Navbar' data-testid='testnavbar'>
            <h2 className='logo'>Org Chart</h2>
            {token ? (
                <button className='login-btn' onClick={() => handleLogout()}>
                    Logout
                </button>
            ) : (
                <button className='login-btn' data-testid='testloginbtn' onClick={() => handleLogin()}>
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
