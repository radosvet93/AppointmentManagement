import { useAtom } from 'jotai';
import { errorAtom } from '../atoms';
import CreateAppointment from './CreateAppointment';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';
import useGetAppointments from '../hooks/useGetAppointments';

const AdminDashboard = () => {
  const [error] = useAtom(errorAtom);
  const { appointments } = useGetAppointments();
  // TODO: Admin can make new appointment based on user ID, see all appointments, edit and delete
  // TODO: Admin can see all users in system, select, edit or delete??? Maybe feature for later

  const appointmentsIds = [...new Set(appointments.map((appointment) => appointment.owner))];

  return (
    <>
      {error ? (
        <p>There is an error</p>
      ) : (
        <>
          <ul>
            {appointments?.map((appointment) => {
              return (
                <li key={appointment._id}>
                  <Link to={`/appointments/${appointment._id}`}>
                    <h2>{appointment.name}</h2>
                  </Link>
                  <p>{appointment.description}</p>
                  <small>{formatDate(appointment.date)}</small>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <CreateAppointment assignTo={appointmentsIds} />
    </>
  );
};

export default AdminDashboard;
