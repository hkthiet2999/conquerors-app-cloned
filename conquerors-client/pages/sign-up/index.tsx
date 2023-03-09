import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { UserService } from '../../services/user';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const service = new UserService();
  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await service.register(data.email, data.password).catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      },
    );

    if (result) {
      console.log('result', result);
      toast.success('Registered, please login!');
      router.push('/sign-in');
    }
  };

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img
              className='h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Sign up your account</h2>
          </div>

          <div className='mt-8'>
            <div>
              <div>
                <p className='text-sm font-medium text-gray-700'>Sign up with</p>

                <div className='mt-1 grid grid-cols-3 gap-3'>
                  <div>
                    <a
                      href='#'
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign up with Facebook</span>
                      <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      href='#'
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign up with Twitter</span>
                      <img
                        className='w-5 h-5'
                        src='./google.svg'
                        alt='Google'
                        aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className='mt-6 relative'>
                <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <form
                className='space-y-6'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      className='input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div className={'text-red-500'}>
                    {errors.email && <p>Email is required.</p>}
                  </div>
                </div>

                <div className='space-y-1'>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      type={'password'}
                      {...register('password', { required: true })}
                      className='input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div className={'text-red-500'}>
                    {errors.password && <p>Password is required.</p>}
                  </div>
                </div>

                <div className='flex items-center justify-end'>
                  <div className='text-sm'>
                    <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            <div className='divider'></div>
            <div className='text-sm text-center'>
              <Link href='/sign-in' className='font-medium text-indigo-600 hover:text-indigo-500'>
                Sign in if you already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
          alt=''
        />
      </div>
    </div>
  );
}
