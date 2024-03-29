import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(ROUTES.home);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (formData) => await signIn(formData);

  return (
    <div className="flex justify-center">
      <form className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
            })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-danger text-xs italic" role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-danger text-xs italic" role="alert">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="6 characters min"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            {...register('password', {
              required: 'Password is required',
              min: 6,
            })}
          />
          {errors.password && (
            <p className="text-danger text-xs italic" role="alert">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-orange-600 text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
