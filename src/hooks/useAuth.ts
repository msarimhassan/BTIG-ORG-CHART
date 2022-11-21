import { useContext } from 'react';
import { AuthContext } from '../context';

const useAuth = () => {
    const { activeUser, setActiveUser, token, setToken } = useContext(AuthContext);

    const setCredential = (token: any, user: any) => {
        localStorage.setItem('org-token', token);
        localStorage.setItem('org-user', JSON.stringify(user));
        setToken(token);
        setActiveUser(user);
    };
    return { setCredential, token, activeUser, setToken };
};

export default useAuth;
