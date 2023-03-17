import { useSetAtom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedAtom, userAtom } from '../atoms';
import { ROUTES } from '../constants';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  const login = async (formData) => {
    try {
      const logIn = await fetch('/api/users/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const user = await logIn.json();
      setUser(user);

      if (user) {
        setIsAuthenticated(true);
        return navigate(ROUTES.dashboard, { replace: true });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/users/log-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsAuthenticated(false);
      return navigate(ROUTES.home, { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  const signIn = async () => {
    try {
      const signIn = await fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const user = await signIn.json();
      setUser(user);

      if (user) {
        setIsAuthenticated(true);
        return navigate(ROUTES.dashboard, { replace: true });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return { signIn, login, logout, isAuthenticated };
};

export default useAuth;
