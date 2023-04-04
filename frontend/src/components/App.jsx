import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../routes/LoginPage';
import Root from '../root';
import ErrorPage from '../routes/error-page';
import DashboardPage from '../routes/DashboardPage';
import PrivateRoute from '../routes/PrivateRoute';
import { ROUTES } from '../constants';
import HomePage from '../routes/HomePage';
import SignInPage from '../routes/SignInPage';
import GetAppointmentPage from '../routes/GetAppointmentPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.home,
          element: <HomePage />,
        },
        {
          path: ROUTES.dashboard,
          element: (
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          ),
        },
        {
          path: ROUTES.signIn,
          element: <SignInPage />,
        },
        {
          path: ROUTES.login,
          element: <LoginPage />,
        },
        {
          path: ROUTES.appointment,
          element: (
            <PrivateRoute>
              <GetAppointmentPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
