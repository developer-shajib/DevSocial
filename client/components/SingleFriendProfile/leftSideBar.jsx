'use client';
import Avatar from '@/public/image/avatar.jpg';
import Avatar1 from '@/public/image/avatar1.jpg';
import Avatar2 from '@/public/image/avatar2.jpg';
import Avatar3 from '@/public/image/avatar3.webp';
import Avatar4 from '@/public/image/avatar4.jpg';
import Avatar5 from '@/public/image/avatar5.webp';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import { useSelector } from 'react-redux';
import Link from 'next/link.js';
import Image from 'next/image.js';

// <!-- Avatar show -->
const allAvatar = [
  { image: Avatar1, name: 'Rakib' },
  { image: Avatar2, name: 'Sarif' },
  { image: Avatar3, name: 'Masud' },
  { image: Avatar4, name: 'Sakib' },
  { image: Avatar5, name: 'Nazmul' }
];

const LeftSideBar = () => {
  const { user, users } = useSelector(getAllAuthState);
  const withoutMe = users?.filter((item) => item._id != user._id);

  return (
    <>
      <div>
        {/* // PHOTOS */}
        <div className='mr-12 mt-4'>
          <div
            className='p-4 shadow rounded-lg bg-white w-80'
            id='intro'>
            {/* Header */}
            <div className='flex justify-between'>
              <h1 className='font-bold text-xl'>Photo</h1>
              <Link
                href='/friends/myId'
                className='text-lg text-blue-700 hover:bg-blue-200'>
                See All Photo
              </Link>
            </div>
            {/* List */}
            <div className=''>
              <p className='text-base text-gray-400'>1000 friends</p>
              <div className='grid grid-cols-3 gap-1'>
                {allAvatar?.map((item, index) => (
                  <div
                    className='bg-white p-0.5'
                    key={index}>
                    <Image
                      src={item.image}
                      width={96}
                      height={96}
                      className='w-24 h-24 rounded-md mt-2 cursor-pointer'
                      alt='avatar'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* // END PHOTOS */}

        {/* // FRIENDS */}
        <div className='mr-12 mt-4'>
          <div
            className='p-4 shadow rounded-lg bg-white w-80'
            id='intro'>
            {/* Header */}
            <div className='flex justify-between'>
              <h1 className='font-bold text-xl'>Friends</h1>
              <Link
                href='/friends/myId'
                className='text-lg text-blue-700 hover:bg-blue-200'>
                See All Friends
              </Link>
            </div>
            {/* List */}
            <div className=''>
              <p className='text-base text-gray-400'>1000 friends</p>
              <div className='grid grid-cols-3 gap-1'>
                {withoutMe?.map((item) => (
                  <div
                    key={item._id}
                    className='bg-white p-0.5'>
                    {item?.photo ? (
                      <Image
                        src={item?.photo}
                        className='w-24 h-24 rounded-md mt-2 cursor-pointer'
                        width={96}
                        height={96}
                        alt={item?.username}
                      />
                    ) : (
                      <Image
                        src={Avatar}
                        className='w-24 h-24 rounded-md mt-2 cursor-pointer'
                        width={96}
                        height={96}
                        alt='avatar'
                      />
                    )}

                    <Link
                      href={`/friends/${item?._id}`}
                      className='font-semibold text-xs'>
                      {item?.username}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
