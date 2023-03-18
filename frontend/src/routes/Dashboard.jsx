import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';
import useGetUserRole from '../hooks/useGetUserRole';
import useGetAppointments from '../hooks/useGetAppointments';
import CreateAppointment from './CreateAppointment';

const Dashboard = () => {
  // TODO: User can make new appointment, see their appointments, edit and delete
  const { appointments } = useGetAppointments();
  const { role } = useGetUserRole();
  const isAdmin = role === 'admin';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <>
      {appointments?.map((appointment) => {
        return (
          <div
            key={appointment._id}
            className="w-[48%] mx-[1%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-8"
          >
            <Link to={`/appointment/${appointment._id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {appointment.name}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{appointment.description}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-300 mb-4">{formatDate(appointment.date)}</p>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Update
            </button>
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>
          </div>
        );
      })}
      <CreateAppointment />
    </>
  );
};

export default Dashboard;
