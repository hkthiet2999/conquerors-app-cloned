import { Layout } from '../../components/Layout';
import React, { useEffect, useState, Fragment } from 'react'
import { UserService } from '../../services/user';
import { ArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Card from '../../components/Card';
import { Dialog, Transition } from '@headlessui/react'
import { DISTRICTS } from '../../constants/district';
import { PostService } from '../../services/post';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Post() {
  const [user, setUser] = useState(null);
  let [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const postService = new PostService();
  const onSubmit = async (data) => {
    console.log('data submit', data);
    const result = await postService.create(data).catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      },
    );

    if (result) {
      console.log('result', result);
      toast.success('Posted!');
    }
  };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const service = new UserService();
  useEffect(() => {
    service.me().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <Layout headerTitle={'Post'}>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create new post
        </button>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <label htmlFor="mobile-search-candidate" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search-candidate" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </div>
              <input
                type="text"
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
                placeholder="Search"
              />
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
                placeholder="Search posts"
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span className="ml-2">Location</span>
              <ArrowDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Card/>
        </div>
        <div>
          <Card/>
        </div>
        <div>
          <Card/>
        </div>
        <div>
          <Card/>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a new post
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="space-y-8 divide-y divide-gray-200">
                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div>
                          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                            <div
                              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label htmlFor="first-name"
                                     className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                  {...register('title', {
                                    required: true,
                                  })}
                                  type="text"
                                  name="title"
                                  id="title"
                                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div
                              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label htmlFor="about"
                                     className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Description
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="description"
                  name="description"
                  {...register('description', {
                    required: true,
                  })}
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
                                <p className="mt-2 text-sm text-gray-500">Describe something about your post</p>
                              </div>
                            </div>

                            <div
                              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label htmlFor="country"
                                     className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                District
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                  id="district"
                                  {...register('district', {
                                    required: true,
                                  })}
                                  name="district"
                                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                >
                                  {DISTRICTS.map((district) => (
                                    <option key={district.id} value={district.id}>
                                      {district.name}
                                    </option>
                                  ))}
                                </select>
                                <p className="mt-2 text-sm text-gray-500">Please choose district in Ho Chi Minh
                                  city.</p>
                              </div>
                            </div>
                            <div
                              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label htmlFor="cover-photo"
                                     className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Upload photo
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div
                                  className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  <div className="space-y-1 text-center">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create post now!
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  )
}
