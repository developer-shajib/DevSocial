'use client';

import { CreatePost, Header, LeftSideBar, Post, RightSideBar } from '@/components';
import { useMeQuery } from '@/features/auth/authApiSlice.js';
import { getUserData } from '@/features/auth/authSlice.js';
import createToast from '@/utils/createToast.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const { data, isLoading, isError, error, isSuccess } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      createToast(error.message);
    }
    if (isSuccess) {
      dispatch(getUserData({ user: data?.user, users: data?.users, posts: data?.posts }));
    }
  }, [dispatch, data, isError, error, isSuccess]);

  return (
    <>
      <Header />

      {/* <!-- body main --> */}
      <div className='body-main w-full'>
        <div className='flex justify-between  px-2 gap-4 '>
          {/* <!-- Left side --> */}
          <div className=' w-3/12 shadow-lg py-4 dark:bg-slate-800'>
            <LeftSideBar />
          </div>

          {/* <!-- Center --> */}
          <div className=' w-9/12 lg:w-6/12 px-4   xl:px-12'>
            {/* <!-- Create Post Form --> */}
            <CreatePost />

            {/* <!-- show post bar --> */}
            <Post />
          </div>

          {/* <!-- Right side --> */}
          <div className=' hidden lg:block w-3/12 text-left '>
            <RightSideBar />
          </div>
        </div>
      </div>

      {/* <!-- Left side bar --> */}
    </>
  );
}
