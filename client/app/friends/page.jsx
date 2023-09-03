'use client';

import Avatar from '@/public/image/avatar.jpg';
import Image from 'next/image.js';
import Link from 'next/link.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthState, getUserData } from '@/features/auth/authSlice.js';
import { useMeQuery } from '@/features/auth/authApiSlice.js';
import { useEffect } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useProfileUpdateMutation } from '@/features/profileUpdate/profileUpdateApiSlice.js';
import { Header } from '@/components/index.js';

const Friends = () => {
  const { data, isLoading, isError, error, isSuccess } = useMeQuery();
  const dispatch = useDispatch();
  const { users, user } = useSelector(getAllAuthState);
  const withoutMe = users?.filter((item) => item._id != user._id);
  const [profileUpdate] = useProfileUpdateMutation();

  // <!-- handle follow button -->
  const handleFollowBtn = (followingId) => {
    const formData = new FormData();
    formData.append('following', followingId);

    profileUpdate({ id: user?._id, data: formData });
  };

  useEffect(() => {
    if (isError) {
      createToast(error.message);
    }
    if (isSuccess) {
      dispatch(getUserData({ user: data?.user, users: data?.users, posts: data?.posts }));
    }
  }, [dispatch, data]);

  return (
    <>
      <Header />
      <div className='w-full py-4 bg-slate-50'>
        <div className='w-[70%] mx-auto '>
          <p className='text-2xl py-4 border-b-2 border-slate-400 mb-4'>Friends</p>

          <div className='flex gap-4 flex-wrap flex-row '>
            {withoutMe?.map((item) => (
              <div className='card w-60 bg-base-100 shadow-xl'>
                <Link href={`/friends/${item._id}`}>
                  <figure>
                    {item?.photo ? (
                      <Image
                        src={item?.photo}
                        alt={item?.username}
                        width={500}
                        height={400}
                      />
                    ) : (
                      <Image
                        src={Avatar}
                        alt='avatar'
                        width={150}
                        height={100}
                      />
                    )}
                  </figure>
                </Link>

                <div className='card-body p-3'>
                  <Link
                    href={`/friends/${item?._id}`}
                    className='card-title hover:text-red-500 tracking-wide transition-all duration-300'>
                    {item?.username}
                  </Link>
                  <p>{item?.followers.length} followers</p>
                  <div className='card-actions justify-end'>
                    {item?.followers?.find((followerItem) => followerItem._id == user?._id) ? (
                      <button
                        onClick={() => handleFollowBtn(item._id)}
                        className='w-full bg-red-500 text-white rounded-md py-2 hover:bg-green-400 transition-all duration-300'>
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollowBtn(item._id)}
                        className='w-full bg-blue-400 text-white rounded-md py-2 hover:bg-green-400 transition-all duration-300'>
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
