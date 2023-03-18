import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const HomePage = () => {
  return (
    <section className="flex items-center flex-col">
      <h1 className="text-3xl mb-6">Welcome to Appointment manager</h1>
      <div>
        <p>
          You can{' '}
          <Link className="underline" to={ROUTES.signIn}>
            sign in
          </Link>{' '}
          or if you have already an account{' '}
          <Link className="underline" to={ROUTES.login}>
            log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default HomePage;
