import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { AuthContext } from '../../contexts/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1503248947681-3198a7abfcc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ headerTitle }) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const signOut = () => {
    authContext.logout();
  };
  return (
    <div className='bg-green-600 pb-32'>
      <Disclosure as='nav' className='bg-green-500 border-b border-green-300 border-opacity-25 lg:border-none'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
              <div
                className='relative h-16 flex items-center justify-between lg:border-b lg:border-green-400 lg:border-opacity-25'>
                <div className='px-2 flex items-center lg:px-0'>
                  <div className='flex-shrink-0'>
                    <img
                      className='block h-10 w-10'
                      src='../logo.png'
                    />
                  </div>
                  <div className='hidden lg:block lg:ml-10'>
                    <div className='flex space-x-4'>
                      <Link
                        key={'Dashboard'}
                        href={'/'}
                        className={classNames(
                          router.pathname === '/'
                            ? 'bg-green-700 text-white'
                            : 'text-white hover:bg-green-500 hover:bg-opacity-75',
                          'rounded-md py-2 px-3 text-sm font-medium',
                        )}
                      >
                        Dashboard
                      </Link>
                      <Link
                        key={'event'}
                        href={'/event'}
                        className={classNames(
                          router.pathname === '/event'
                            ? 'bg-green-700 text-white'
                            : 'text-white hover:bg-green-500 hover:bg-opacity-75',
                          'rounded-md py-2 px-3 text-sm font-medium',
                        )}
                      >
                        Event
                      </Link>
                      <Link
                        key={'post'}
                        href={'/post'}
                        className={classNames(
                          router.pathname === '/post'
                            ? 'bg-green-700 text-white'
                            : 'text-white hover:bg-green-500 hover:bg-opacity-75',
                          'rounded-md py-2 px-3 text-sm font-medium',
                        )}
                      >
                        Post
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end'>
                  <div className='max-w-lg w-full lg:max-w-xs'>
                    <label htmlFor='search' className='sr-only'>
                      Search
                    </label>
                    <div className='relative text-gray-400 focus-within:text-gray-600'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
                        <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
                      </div>
                      <input
                        id='search'
                        className='block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white focus:border-white sm:text-sm'
                        placeholder='Search'
                        type='search'
                        name='search'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex lg:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className='bg-green-600 p-2 rounded-md inline-flex items-center justify-center text-green-200 hover:text-white hover:bg-green-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='hidden lg:block lg:ml-4'>
                  <div className='flex items-center'>
                    <button
                      type='button'
                      className='bg-green-600 flex-shrink-0 rounded-full p-1 text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative flex-shrink-0'>
                      <div>
                        <Menu.Button
                          className='bg-green-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white'>
                          <span className='sr-only'>Open user menu</span>
                          <img className='rounded-full h-8 w-8' src={user.imageUrl} alt='' />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items
                          className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item key='settings'>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm text-gray-700 w-full text-left',
                                )}
                              >
                                Settings
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item key='profile'>
                            {({ active }) => (
                              <>
                                <Link
                                  href={'/profile'}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block py-2 px-4 text-sm text-gray-700 w-full text-left hover:bg-gray-100',
                                  )}
                                >
                                  My Profile
                                </Link>
                              </>
                            )}
                          </Menu.Item>
                          <Menu.Item key='sign-out'>
                            {({ active }) => (
                              <button
                                onClick={signOut}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block py-2 px-4 text-sm text-gray-700 w-full text-left',
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <header className='py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-white'>{headerTitle}</h1>
        </div>
      </header>
    </div>
  );
}
