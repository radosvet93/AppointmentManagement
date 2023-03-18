import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { appointmentAtom, userAtom } from '../atoms';
import { useAtom, useAtomValue } from 'jotai';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';
import { formatDate } from '../helpers';
import CreateAppointment from './CreateAppointment';

const Appointment = () => {
  const params = useParams();
  const [appointment, setAppointment] = useAtom(appointmentAtom);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const userAppointments = await fetch(`/api/appointments/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await userAppointments.json();

        if (result) {
          setAppointment(result);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    getAppointment();
  }, []);

  console.log({ appointment });

  return appointment ? (
    <section className="flex items-center flex-col">
      <h1 className="text-3xl mb-6">{appointment.name}</h1>
      <div>
        <p>{appointment.description}</p>
        <p>{formatDate(appointment.date)}</p>
      </div>
    </section>
  ) : (
    <>
      <p>There are no appointments</p>
      <CreateAppointment />
    </>
  );
};

export default Appointment;
