import { useAtomValue } from 'jotai';
import { appointmentsIdsAtom } from '../atoms';
import CreateAppointment from './CreateAppointment';
import Appointment from './Appointment';

const AdminDashboard = () => {
  const appointmentsIds = useAtomValue(appointmentsIdsAtom);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl">All appointments</h1>
      <Appointment isAdmin />

      <CreateAppointment assignTo={appointmentsIds} />
    </div>
  );
};

export default AdminDashboard;
