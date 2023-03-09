import { Layout } from '../../components/Layout';
import { useEffect, useState } from 'react'
import { UserService } from '../../services/user';
import * as moment from 'moment';
import UserStats from '../../components/Stats';

export default function Profile() {
  const [user, setUser] = useState(null);
  const service = new UserService();

  useEffect(() => {
    service.me().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <Layout headerTitle={'Profile'}>
      <main className="py-10">
        {/* Page header */}
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full"
                  src={user?.avatarUrl ? user.avatarUrl : './default.jpg'}
                  alt=""
                />
                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"/>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.displayName ?? 'Anonymous'}</h1>
              <div className="badge badge-primary">Active User</div>
            </div>
          </div>
          <div
            className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Edit My Profile
            </button>
          </div>
        </div>

        <div
          className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    General Information
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Id</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                      <dd
                        className="mt-1 text-sm text-gray-900">{user?.createdAt ? moment(user.createdAt).format('DD/MM/YYYY') : ''}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.phoneNumber}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">About</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                        Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                        proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
            <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                      Comments
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul role="list" className="space-y-8">
                      <li key={'test-comment'}>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={'./default.jpg'}
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="text-sm">
                              <a href="#" className="font-medium text-gray-900">
                                Test name
                              </a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              <p>Description test</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 font-medium">26-11-2022</span>{' '}
                              <span className="text-gray-500 font-medium">&middot;</span>{' '}
                              <button type="button" className="text-gray-900 font-medium">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full"
                           src={user?.avatarUrl ? user.avatarUrl : './default.jpg'}
                           alt=""/>
                    </div>
                    <div className="min-w-0 flex-1">
                      <form action="#">
                        <div>
                          <label htmlFor="comment" className="sr-only">
                            About
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Add a note"
                            defaultValue={''}
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
            <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  History events
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul role="list" className="-mb-8">
                  </ul>
                </div>
              </div><div className="mt-2 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <UserStats/>

            </div>
            </section>

        </div>
      </main>
    </Layout>
  )
}
