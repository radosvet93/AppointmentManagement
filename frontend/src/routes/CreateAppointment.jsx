import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { appointmentsAtom, userAtom } from '../atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import useAuth from '../hooks/auth';
import { ROUTES } from '../constants';
import { formatDate } from '../helpers';
import { useForm } from 'react-hook-form';

const CreateAppointment = ({ assignTo }) => {
  const [appointments, setAppointments] = useAtom(appointmentsAtom);

  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    console.log('formData', formData);

    try {
      const createAppointmentForUser = await fetch(`/api/appointments/${formData.assign}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await createAppointmentForUser.json();

      setAppointments([
        ...appointments,
        {
          owner: formData.assign,
          date: formData.date,
          description: formData.description,
          name: formData.name,
        },
      ]);

      if (result) {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('There was an error creating the appointment');
      console.log({ error });
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
          type="text"
          placeholder="Date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          {...register('date', {
            required: 'date is required',
          })}
        />
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
            <option value="">Assign appointment to...</option>
            {assignTo.map((to) => (
              <option value={to}>{to}</option>
            ))}
          </select>
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
