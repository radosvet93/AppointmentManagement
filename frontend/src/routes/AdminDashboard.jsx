// TODO: private route, needs to check if there is a cookie
// TODO: needs to check if that is the user role or the admin role and redirect to either dashboards

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { appointmentsAtom, errorAtom } from '../atoms';
import CreateAppointment from './CreateAppointment';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);
  const [error, setError] = useAtom(errorAtom);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointments = await fetch('/api/appointments/all', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await appointments.json();

        if (result) {
          setAppointments(result);
        }
      } catch (error) {
        setError(error);
      }
    };

    getAppointments();
  }, []);
  // TODO: Admin can make new appointment based on user ID, see all appointments, edit and delete
  // TODO: Admin can see all users in system, select, edit or delete??? Maybe feature for later

  const appointmentsIds = [...new Set(appointments.map((appointment) => appointment.owner))];

  return (
    <>
      {error ? (
        <p>There is an error</p>
      ) : (
        <>
          <pre>{JSON.stringify(appointments, null, 2)}</pre>
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