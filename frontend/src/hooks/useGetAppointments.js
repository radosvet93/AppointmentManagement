import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { appointmentAtom } from '../atoms';

const useGetAppointments = () => {
  const [appointments, setAppointments] = useAtom(appointmentAtom);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const userAppointments = await fetch('/api/appointments', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await userAppointments.json();

        if (result) {
          setAppointments(result);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    getAppointments();
  }, [setAppointments]);

  return { appointments };
};

export default useGetAppointments;
