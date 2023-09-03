'use client';
import { Post, ProfileHeader, LeftSideBar } from '@/components/SingleFriendProfile';
import { useParams } from 'next/navigation.js';
import { useMeQuery } from '@/features/auth/authApiSlice.js';
import { useEffect } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthState, getUserData } from '@/features/auth/authSlice.js';
import { Header } from '@/components/index.js';

const SingleFriendPage = () => {
  const { id } = useParams();
  const { data, isSuccess, isError, error } = useMeQuery();
  const dispatch = useDispatch();
  const { users, user } = useSelector(getAllAuthState);
  const userData = users?.find((item) => item._id == id);

  useEffect(() => {
    if (isError) {
      createToast(error.message);
    }
    if (isSuccess) {
      dispatch(getUserData({ user: data?.user, users: data?.users, posts: data?.posts }));
    }
  }, [dispatch, data, isError, isSuccess, error]);

  return (
    <div className='h-screen'>
      <Header />

      <div className='mt-14 shadow bg-white '>
        {/* PROFILE HEADER */}
        <ProfileHeader userData={userData} />
        {/* END PROFILE HEADER */}

        {/* // CONTENT */}
        <div>
          <div className='bg-gray-100 '>
            <div className='flex justify-center '>
              {/* LEFT */}
              <LeftSideBar />
              {/* END LEFT */}

              {/* // POST LIST */}
              <div className='w-2/5'>
                {/* POST */}
                <Post friendId={id} />
                {/* END POST */}
              </div>
              {/* // END POST LIST */}
            </div>
          </div>
        </div>
        {/* // END CONTENT */}
      </div>
    </div>
  );
};

export default SingleFriendPage;
