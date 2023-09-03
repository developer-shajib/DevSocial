'use client';

import Avatar from '@/public/image/avatar.jpg';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { LuNewspaper } from 'react-icons/lu';
import { BsBagCheck } from 'react-icons/bs';
import { FiSave, FiVideo } from 'react-icons/fi';
import { LiaPagerSolid } from 'react-icons/lia';
import { GrGallery } from 'react-icons/gr';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';

function LeftSideBar() {
  const { user } = useSelector(getAllAuthState);

  return (
    <>
      <div className=''>
        {/* <!-- profile button --> */}
        <div className='hover:bg-gray-100 transition-all text-black px-2  rounded-md mb-4 hover:dark:bg-slate-500 duration-200'>
          <Link
            href='/profile'
            className='flex items-center gap-2 md:gap-6 flex-col md:flex-row'>
            <div className='avatar online placeholder'>
              <div className='bg-neutral-focus text-neutral-content rounded-full w-16'>
                {user?.photo ? (
                  <Image
                    className='rounded-full  lg:h-14 lg:w-14'
                    width={24}
                    height={24}
                    src={user?.photo}
                    alt={user?.name}
                  />
                ) : (
                  <Image
                    className='rounded-full  lg:h-14 lg:w-14'
                    width={24}
                    height={24}
                    src={Avatar}
                    alt='name'
                  />
                )}
              </div>
            </div>

            <div className='flex flex-col  items-center md:items-start'>
              <span className='text-xs  md:text-sm lg:text-2xl font-medium dark:text-slate-200 hover:text-slate-900 duration-200'>{user?.username}</span>
              <span className='text-slate-600 text-[8px] md:text-xs lg:text-sm dark:text-slate-300 hover:text-slate-900 duration-200'>{user?.email}</span>
            </div>
          </Link>
        </div>

        <hr />

        {/* <!-- menu button --> */}
        <div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='/friends'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <AiOutlineUsergroupAdd />
              </span>
              <span className='text-sm md:text-lg font-medium'>Friends</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <HiUserGroup />
              </span>
              <span className='text-sm md:text-lg font-medium'>Group</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <LuNewspaper />
              </span>
              <span className='text-sm md:text-lg font-medium'>Newsfeed</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <FiSave />
              </span>
              <span className='text-sm md:text-lg font-medium'>Save</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <FiVideo />
              </span>
              <span className='text-sm md:text-lg font-medium'>Video</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <BsBagCheck />
              </span>
              <span className='text-sm md:text-lg font-medium'>Jobs</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <LiaPagerSolid />
              </span>
              <span className='text-sm md:text-lg font-medium'>Courses</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <GrGallery className='dark:fill:slate-200' />
              </span>
              <span className='text-sm md:text-lg font-medium'>Gallery</span>
            </Link>
          </div>
          <div className='hover:bg-gray-100 transition-all text-slate-500 px-4 py-2 rounded-md mb-4 dark:text-slate-200 duration-200'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <span className='text-sm md:text-2xl'>
                <BiMessageRoundedDetail />
              </span>
              <span className='text-sm md:text-lg font-medium'>Message</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSideBar;
