import { FC } from 'react';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import { logout } from '../../utils';
import { Button } from 'antd';

const Navbar: FC = () => {
  const { token, setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
    logout();
  };

  return (
    <div className='Navbar' data-testid='testnavbar'>
      <p className='logo'>ORG CHART</p>
      {token ? (
        <Button style={{ letterSpacing: 2 }} type='primary' onClick={() => handleLogout()}>
          LOGOUT
        </Button>
      ) : null}
    </div>
  );
};

export default Navbar;
