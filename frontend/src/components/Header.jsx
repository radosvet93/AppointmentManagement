import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import useAuth from '../hooks/auth';

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="text-gray-900 p-4 mb-12 bg-secondary flex justify-between">
      <span>{isAuthenticated ? 'Logo' : <Link to={ROUTES.home}>Logo</Link>}</span>
      <nav>
        <ul className="flex gap-4">
          <li>
            {isAuthenticated ? <Link to={ROUTES.dashboard}>Dashboard</Link> : <Link to={ROUTES.login}>Log in</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
