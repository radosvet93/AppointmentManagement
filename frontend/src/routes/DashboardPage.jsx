import AdminDashboard from '../components/AdminDashboard';
import useGetUserRole from '../hooks/useGetUserRole';
import useGetAppointments from '../hooks/useGetAppointments';
import CreateAppointment from '../components/CreateAppointment';
import Appointment from '../components/Appointment';

const DashboardPage = () => {
  const { role } = useGetUserRole();
  const isAdmin = role === 'admin';
  useGetAppointments({ isAdmin });

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <>
      <h1 className="mb-8 text-3xl">All appointments</h1>
      <Appointment />
      <CreateAppointment />
    </>
  );
};

export default DashboardPage;
