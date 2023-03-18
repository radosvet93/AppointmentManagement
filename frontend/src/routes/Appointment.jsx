import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { appointmentAtom } from '../atoms';
import { useAtom } from 'jotai';
import { formatDate } from '../helpers';
import CreateAppointment from './CreateAppointment';
import axios from 'axios';

const Appointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useAtom(appointmentAtom);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const userAppointments = await axios.get(`/api/appointments/${id}`);

        setAppointment(userAppointments.data);
      } catch (error) {
        console.log({ error });
      }
    };

    getAppointment();
  }, [id, setAppointment]);

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
