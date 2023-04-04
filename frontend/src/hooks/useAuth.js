import { useSetAtom, useAtom } from 'jotai';
import { RESET } from 'jotai/utils'
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom, userAtom } from '../atoms';
import { ROUTES } from '../constants';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const user = await axios.post('/api/users/log-in', formData);

      setUser(user.data);
      setIsAuthenticated(true);
      return navigate(ROUTES.dashboard, { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/users/log-out');
      setIsAuthenticated(RESET);
      navigate(ROUTES.home, { replace: true });
      
      // Clear all state
      return navigate(0)
    } catch (error) {
      console.log({ error });
    }
  };

  const signIn = async (formData) => {
    try {
      const user = await axios.post('/api/users/sign-in', formData);

      setUser(user.data);
      setIsAuthenticated(true);
      return navigate(ROUTES.dashboard, { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  return { signIn, login, logout, isAuthenticated };
};

export default useAuth;
