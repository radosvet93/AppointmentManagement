import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { appointmentsAtom } from '../atoms';
import axios from 'axios';

const useGetAppointments = ({ isAdmin = false }) => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);

  useEffect(() => {
    const getAppointments = async () => {
      const url = isAdmin ? '/api/appointments/all' : '/api/appointments';
      try {
        const userAppointments = await axios.get(url);

        setAppointments(userAppointments.data);
      } catch (error) {
        console.log({ error });
      }
    };

    getAppointments();
  }, [setAppointments, isAdmin]);

  return { appointments };
};

export default useGetAppointments;
