import { FC } from 'react';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import publicClientApplication from '../../configuration';

const Navbar: FC = () => {
  const { token, setToken } = useAuth();

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
      ) : null}
    </div>
  );
};

export default Navbar;
