import { Link, useNavigate, useParams } from 'react-router-dom';
import { appointmentsAtom, appointmentsIdsAtom, adminAtom } from '../atoms';
import { useAtomValue } from 'jotai';
import CreateAppointment from '../components/CreateAppointment';
import axios from 'axios';
import { ROUTES } from '../constants';
import { useForm } from 'react-hook-form';
import { maxMinDates } from '../helpers';

const GetAppointmentPage = () => {
  const { id } = useParams();
  const appointments = useAtomValue(appointmentsAtom);
  const isAdmin = useAtomValue(adminAtom);
  const appointmentsIds = useAtomValue(appointmentsIdsAtom);
  const navigate = useNavigate();
  const { minDate, maxDate } = maxMinDates();

  const getAppointment = appointments?.filter((app) => app._id === id)[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ name, description, date, assign }) => {
    const formData = { name, description, date };

    try {
      await axios.patch(`/api/appointments/${id}/update/${assign ? assign : ''}`, formData);

      return navigate(ROUTES.dashboard);
    } catch (error) {
      console.log({ error });
    }
  };

  return getAppointment ? (
    <>
      <Link to={ROUTES.dashboard}>Go back to dashboard</Link>
      <form className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="name">
            Name of appointment
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
            defaultValue={getAppointment.name}
            {...register('name', {
              required: 'Name of appointment is required',
            })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-danger text-xs italic" role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            defaultValue={getAppointment.description}
            placeholder="(optional)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            {...register('description')}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="datetime-local"
            min={minDate}
            max={maxDate}
            value={getAppointment.date}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            {...register('date', {
              required: 'date is required',
              min: minDate,
              max: maxDate,
            })}
          />
          {errors.date && (
            <p className="text-danger text-xs italic" role="alert">
              {errors.date?.message}
            </p>
          )}
        </div>

        {isAdmin ? (
          <div className="mb-6">
            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="assign">
              Assign to
            </label>
            <select
              defaultValue={getAppointment.owner}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Assign appointment to..."
              {...register('assign', { required: true })}
            >
              {appointmentsIds.map((to) => (
                <option key={to}>{to}</option>
              ))}
            </select>
            {errors.assign && (
              <p className="text-danger text-xs italic" role="alert">
                {errors.assign?.message}
              </p>
            )}
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-orange-600 text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update appointment
          </button>
        </div>
      </form>
    </>
  ) : (
    <>
      <p>There are no appointments</p>
      <CreateAppointment />
    </>
  );
};

export default GetAppointmentPage;
