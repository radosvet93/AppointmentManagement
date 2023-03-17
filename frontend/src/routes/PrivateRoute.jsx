import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { ROUTES } from '../constants';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate(ROUTES.login, { replace: true });
    }
  }, []);

  return children;
};

export default PrivateRoute;
