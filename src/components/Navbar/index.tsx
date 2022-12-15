import { FC } from 'react';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import publicClientApplication from '../../configuration';
import { logMessage } from '../../utils';
import './bootstrap.css'
import logo from './images/crosshair.svg'

const Navbar: FC = () => {
    const { token, setToken, activeUser } = useAuth();

    const handleLogout = () => {
        setToken(null);
        localStorage.clear();
        publicClientApplication.logoutPopup();
        logMessage(`${activeUser.name} logout from the app`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" data-testid='testnavbar' >
            <a className="navbar-brand" href=""><img alt="BTIG" src={logo} style={{ height: '50px', width: '50px', marginTop: '-1.25rem', marginLeft: '-1rem', marginBottom: '-.5rem' }} /></a>
            <span className="navbar-text w-100">
                Org Chart
            </span>

            {token ? (
                <button className='login-btn' onClick={() => handleLogout()}>
                    Logout
                </button>
            ) : null}
        </nav >
    )
};

export default Navbar;
