'use client';

import Avatar from '@/public/image/avatar.jpg';
import Image from 'next/image.js';
import { BsSearch } from 'react-icons/bs';
import { GrNotification } from 'react-icons/gr';
import { AiOutlineMessage } from 'react-icons/ai';
import Link from 'next/link.js';
import { useLogoutMutation } from '@/features/auth/authApiSlice.js';
import { useRouter } from 'next/navigation.js';
import createToast from '@/utils/createToast.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthState, removeUserData } from '@/features/auth/authSlice.js';
import { useEffect, useState } from 'react';
import { onWindowMatch } from '@/utils/DarkTheme.js';
import Cookies from 'js-cookie';

function Header() {
  const [logout, { isSuccess, isError, error }] = useLogoutMutation();
  const router = useRouter();
  const { user } = useSelector(getAllAuthState);
  const dispatch = useDispatch();

  // <!-- handle logout Btn -->
  const handleLogoutBtn = () => {
    logout();
  };

  if (isSuccess) {
    Cookies.remove('accessToken');
    dispatch(removeUserData());
    createToast('Logged out', 'success');
    router.push('/login');
  }
  if (isError) {
    createToast(error?.message);
  }

  // <!-- dark mode -->
  const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        document.documentElement.classList.add('dark');
        typeof window !== 'undefined' && localStorage.setItem('theme', 'dark');
        break;

      case 'light':
        document.documentElement.classList.remove('dark');
        typeof window !== 'undefined' && localStorage.setItem('theme', 'light');
        break;

      default:
        typeof window !== 'undefined' && localStorage.removeItem('theme');
        onWindowMatch();
        break;
    }
  }, [theme]);

  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', (e) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
  return (
    <>
      <div className='navbar bg-base-100 dark:bg-slate-500 shadow-2xl w-full px-28 '>
        {/* <!-- Icon --> */}
        <div className='flex-none md:flex-1'>
          <Link
            href='/'
            className=' uppercase text-xl lg:text-4xl  font-gluten dark:text-slate-200 duration-200'>
            Social
          </Link>
        </div>

        {/* <!-- Right side --> */}
        <div className='flex-none gap-2'>
          {/* <!-- Search Bar --> */}
          <div className='form-control flex flex-row items-center relative overflow-hidden mr-5'>
            <input
              type='text'
              placeholder='Search.....'
              className='input input-bordered w-24 md:w-auto focus:outline-none pr-12 dark:bg-slate-300 duration-200 placeholder:text-slate-500'
            />
            <span className='text-2xl absolute -right-2 bg-[#eeeeee] rounded-full p-3  hover:bg-[#bebebe] dark:bg-slate-400 duration-200'>{<BsSearch />}</span>
          </div>

          {/* <!-- Side icon --> */}
          <div className='flex flex-row gap-3 sm:gap-1 mr-4'>
            <div className='indicator rounded-full '>
              <span className='indicator-item badge badge-success top-[1px] right-4 text-white'>99+</span>
              <button className='btn text-xl md:text-2xl bg-transparent border-none dark:text-slate-500 dark:hover:bg-slate-300'>
                <GrNotification className='dark:fill-white' />
              </button>
            </div>
            <div className='indicator rounded-full'>
              <button className='btn text-xl md:text-2xl bg-transparent border-none dark:text-slate-500 dark:hover:bg-slate-300   '>
                <AiOutlineMessage className='dark:fill-white' />
              </button>
            </div>

            {/* <!-- Theme Change --> */}
            <label className='swap swap-rotate'>
              {/* this hidden checkbox controls the state */}
              <input type='checkbox' />

              {/* sun icon */}
              <svg
                // data-set-theme='dark'
                onClick={() => setTheme('dark')}
                className='swap-on fill-current w-7 h-7 dark:fill-slate-200'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
              </svg>

              {/* moon icon */}
              <svg
                // data-set-theme='light'
                onClick={() => setTheme('light')}
                className='swap-off fill-current w-7 h-7'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
              </svg>
            </label>
          </div>

          {/* <!-- Drop Down --> */}
          <div className='dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                {user?.photo ? (
                  <Image
                    width={40}
                    height={40}
                    src={user?.photo}
                    alt={user?.name}
                  />
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src={Avatar}
                    alt='avatar'
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:bg-slate-500 dark:text-slate-200'>
              <li>
                <Link
                  href={'/profile'}
                  className='justify-between'>
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogoutBtn}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
