import React, { Fragment, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { PostService } from '../../services/post';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { DISTRICTS } from '../../constants/district';
import { useRouter } from 'next/router'

const PostDetail = () => {
  let [isOpen, setIsOpen] = useState(true);
  const [post, setPost] = useState(null);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const postService = new PostService();
  const router = useRouter()
  const id = router.query.id
  console.log('id', id)
  useEffect(() => {
    if(!router.isReady) return;

    postService.getPostById(id).then((post) => {
        if (post) {
          setPost(post);
        }
      });
  }, []);

  const onSubmit = async (data) => {
    console.log('data submit', data);
    const result = await postService.update(post.id, data).catch((err) => {
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

  return (
    <Layout headerTitle={'Post'}>
      <div className="block sm:flex flex-nowrap mt-2 mb-7">
        <div
          className="sm:flex-shrink-0 w-72 sm:w-1/4 md:1/5 pb-2.5 m-auto sm:m-0 sm:pb-0 sm:mr-7 relative overflow-hidden">
          <span className="animate-ping absolute top-2 left-1 z-10 inline-flex h-2 w-2 rounded-full bg-red-300"/>
          <img
            src={`https://images.unsplash.com/photo-1518699376815-e6cae5137429?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`}
            className="w-full rounded-tl-lg rounded-tr-lg"
            alt=""
          />
        </div>

        <div className="text-sm sm:text-base lg:text-lg">
          <h1
            className="font-bold text-center sm:text-left text-4xl mb-2.5 text-gray-700">The shore of Lake Mango is
            seriously polluted</h1>
          <h3 className="">The lakeside is full of domestic waste, wishing to accompany garbage collection and protect
            the environment.</h3>
          <div className="pt-2.5">
            <span className="font-medium">Status:</span>
            <span className="font-bold ml-2 text-green-400">Active</span>
          </div>
          <div className="pt-2.5">
            <span className="font-medium">Joined persons:</span>
            <span className="font-bold ml-2">2000</span>
          </div>
          <div className={'mt-2'}>
            <progress className="progress progress-success w-80" value="50" max="100"></progress>
          </div>
          <button className="mt-2 btn btn-sm btn-active  btn-ghost">Edit this post</button>
        </div>
      </div>
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
                        src={'../default.jpg'}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          Nguyen Tien Dat
                        </a>
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        <p>I hope we can do it soon</p>
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
                     src={'.././default.jpg'}
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
      <div className="mt-5 overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox"/>
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox"/>
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component"/>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br/>
              <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox"/>
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component"/>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br/>
              <span className="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>

          </tbody>
          <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
          </tfoot>
        </table>
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
                    Update this post
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
                                  defaultValue={post?.title}
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
                  defaultValue={post?.content}
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
                            Update post
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
  );
};

export default PostDetail;
