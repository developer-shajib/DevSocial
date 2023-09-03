import Image from 'next/image.js';
import React, { useEffect } from 'react';
import Link from 'next/link.js';
import Avatar from '@/public/image/avatar.jpg';
import CoverImg from '@/public/image/coverImg.jpg';
import { useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import { useProfileUpdateMutation } from '@/features/profileUpdate/profileUpdateApiSlice.js';
import createToast from '@/utils/createToast.jsx';

function ProfileHeader({ userData }) {
  const { user } = useSelector(getAllAuthState);
  const [profileUpdate, { data, isError, isSuccess, error, isLoading }] = useProfileUpdateMutation();

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
  }, [isError, error]);

  return (
    <div>
      <div
        className='  flex justify-center w-80 mx-auto'
        style={{ height: '348px' }}>
        <div className='flex flex-col justify-center'>
          <div
            className='md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
 flex justify-center mx-auto'
            style={{ width: '940px', height: '348px' }}>
            {userData?.cover ? (
              <Image
                width={1000}
                height={500}
                className='w-ful h-full bg-cover'
                src={userData?.cover}
                alt='cover_img'
              />
            ) : (
              <Image
                width={1000}
                height={500}
                className='w-ful h-full bg-cover'
                src={CoverImg}
                alt='cover_img'
              />
            )}

            {/* // cover photo */}
            <div className=''>
              {/* profile photo */}
              {userData?.cover ? (
                <Image
                  src={userData?.photo}
                  className='rounded-full absolute top-48 inset-x-96 border-4 border-white w-40 h-40'
                  style={{ width: '168px', height: '168px' }}
                  alt={userData?.username}
                  width={168}
                  height={168}
                />
              ) : (
                <Image
                  src={Avatar}
                  className='rounded-full absolute top-48 inset-x-96 border-4 border-white w-40 h-40'
                  style={{ width: '168px', height: '168px' }}
                  alt='avatar'
                  width={168}
                  height={168}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* // INFOS */}
      <div className='flex justify-center flex-col mt-5 mb-3.5'>
        <div className='flex gap-3 justify-center items-center'>
          <h1 className='text-center font-bold text-3xl'>{userData?.username}</h1>
          <div className='card-actions justify-end'>
            {userData?.followers?.find((followerItem) => followerItem._id == user?._id) ? (
              <button
                onClick={() => handleFollowBtn(userData._id)}
                className='text-sm bg-error text-white rounded px-3 py-1 hover:bg-red-500 transition-all shadow-lg'>
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollowBtn(userData._id)}
                className='text-sm bg-success text-white rounded px-3 py-1 hover:bg-blue-700 transition-all shadow-lg'>
                Follow
              </button>
            )}
          </div>
        </div>
        <Link
          href='#'
          className='text-center text-slate-800 font-semibold text-sm'>
          {userData?.following.length} friends
        </Link>
        <hr className='full flex self-center w-2/3 mt-2' />
      </div>
      {/* // END INFOS */}
    </div>
  );
}

export default ProfileHeader;
