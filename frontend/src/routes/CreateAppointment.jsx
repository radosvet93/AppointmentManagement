import { useState } from 'react';
import { appointmentsAtom } from '../atoms';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateAppointment = ({ assignTo }) => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);
  const [message, setMessage] = useState('');
  const today = new Date();
  today.setUTCHours(today.getUTCHours() + 4);

  const minDate = today.toISOString().slice(0, -8);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    console.log('formData', formData);

    // TODO: create hook for the creating appointments

    if (assignTo) {
      try {
        const createAppointmentForUser = await axios.post(`/api/appointments/${formData.assign}/create`, formData);

        setAppointments([
          ...appointments.data,
          {
            owner: formData.assign,
            date: formData.date,
            description: formData.description,
            name: formData.name,
          },
        ]);
        setMessage(createAppointmentForUser.message);
      } catch (error) {
        setMessage('There was an error creating the appointment');
        console.log({ error });
      }
    } else {
      try {
        const createAppointment = await axios.post(`/api/appointments`, formData);

        setAppointments([
          ...appointments.data,
          {
            date: formData.date,
            description: formData.description,
            name: formData.name,
          },
        ]);
        setMessage(createAppointment.message);
      } catch (error) {
        setMessage('There was an error creating the appointment');
        console.log({ error });
      }
    }
  };

  return (
    <form className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="name">
          Name of appointment
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Name"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          {...register('date', {
            required: 'date is required',
            min: minDate,
          })}
        />
        {errors.date && (
          <p className="text-danger text-xs italic" role="alert">
            {errors.date?.message}
          </p>
        )}
      </div>

      {assignTo ? (
        <div className="mb-6">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="assign">
            Assign to
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Assign appointment to..."
            {...register('assign', { required: true })}
          >
            {assignTo.map((to) => (
              <option key={to} value={to}>
                {to}
              </option>
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
          Create appointment
        </button>
      </div>

      {message || null}
    </form>
  );
};

export default CreateAppointment;
