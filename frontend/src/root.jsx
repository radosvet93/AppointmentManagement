import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Root = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
