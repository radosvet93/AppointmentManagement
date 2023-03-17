import { useRouteError } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../hooks/auth';

const ErrorPage = () => {
  const { logout } = useAuth();
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-100">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <button
          className="bg-primary hover:bg-orange-600 text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={logout}
        >
          Logout
        </button>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
