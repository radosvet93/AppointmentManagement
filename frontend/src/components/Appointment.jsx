import { Link } from 'react-router-dom';
import { formatDate } from '../helpers';
import axios from 'axios';
import { useAtom } from 'jotai';
import { appointmentsAtom } from '../atoms';

const Appointment = ({ isAdmin = false }) => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);
  const onDelete = async (id) => {
    try {
      if (isAdmin) {
        await axios.delete(`/api/appointments/${id}/delete`);
      } else {
        await axios.delete(`/api/appointments/${id}/cancel`);
      }
      setAppointments(appointments.filter((appointment) => id !== appointment._id));
    } catch (error) {
      console.log({ error });
    }
  };
  const today = new Date().toISOString();

  return (
    <section className="grid gap-4 grid-cols-2 mb-8">
      {appointments?.map((appointment) => {
        const classNameExpired = 'bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-300 opacity-70';
        let appointmentClassName = 'bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-300';

        const appointmentExpired = today > appointment.date;
        if (appointmentExpired) {
          appointmentClassName = classNameExpired;
        }

        return (
          <article key={appointment._id} className={`relative ${appointmentClassName}`}>
            <Link className="block p-6" to={`/appointment/${appointment._id}`}>
              <h2 className="mb-2 text-2xl font-bold tracking-tight flex justify-between items-center">
                {appointment.name}
                {appointmentExpired ? (
                  <span className="text-xs uppercase font-thin tracking-wider bg-red-600 p-1 rounded-xl text-white">
                    expired
                  </span>
                ) : null}
              </h2>

              <p className="font-normal">{appointment.description}</p>
              <small className="italic">{formatDate(appointment.date)}</small>
              {isAdmin ? <p>Owner: {appointment.owner}</p> : null}
            </Link>
            <button
              onClick={() => onDelete(appointment._id)}
              className="absolute top-0 right-0 px-2 py-1 text-xs text-center rounded-lg bg-primary text-white"
            >
              Delete
            </button>
          </article>
        );
      })}
    </section>
  );
};

export default Appointment;
