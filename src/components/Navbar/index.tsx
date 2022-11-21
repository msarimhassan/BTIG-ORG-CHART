import { FC } from 'react';
import './Navbar.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { configuration } from '../../configuration';
import { Network, Urls, config } from '../../config';
import useAuth from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import useLoader from '../../hooks/useLoader';

const publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: configuration.appId,
        redirectUri: configuration.redirectUri,
        authority: configuration.authority,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
});

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
        <div className='Navbar'>
            <h2 className='logo'>Org Chart</h2>
            {token ? (
                <button className='login-btn' onClick={() => handleLogout()}>
                    Logout
                </button>
            ) : (
                <button className='login-btn' onClick={() => handleLogin()}>
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
