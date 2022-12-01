import { FC } from 'react';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import publicClientApplication from '../../configuration';
import { logMessage } from '../../utils';

const Navbar: FC = () => {
  const { token, setToken, activeUser } = useAuth();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    publicClientApplication.logoutPopup();
    logMessage(`${activeUser.name} logout from the app`);
  };

  return (
    <div className='Navbar' data-testid='testnavbar'>
      <h2 className='logo'>Org Chart</h2>
      {token ? (
        <button className='login-btn' onClick={() => handleLogout()}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Navbar;
