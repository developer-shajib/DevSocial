'use client';

import googleImg from '@/public/image/google.svg';
import loginImg from '@/public/image/login-img.jpeg';
import Image from 'next/image.js';
import Link from 'next/link.js';
import Input from '@/components/Input.jsx';
import { useEffect, useState } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useRouter } from 'next/navigation.js';
import { useLoginMutation } from '@/features/auth/authApiSlice.js';
import { useDispatch } from 'react-redux';
import { getUserData } from '@/features/auth/authSlice.js';
import Cookies from 'universal-cookie';

function Login() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const [login, { data, isError, isSuccess, error, isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle login form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) return createToast('All fields are required!');
    login({ email: input.email, password: input.password });
  };

  useEffect(() => {
    if (isError) {
      createToast(error?.data?.message);
    }
    if (isSuccess) {
      createToast(data?.message, 'success');
      dispatch(getUserData({ user: data?.user, users: data?.users, posts: data?.posts }));
      router.push('/');
      // document.cookie = `aToken=${data?.token}`;
      cookies.set('aToken', data?.token);
    }
  }, [dispatch, isError, isSuccess, error, data, router, cookies]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold text-primary-gradient'>Login</span>

            {/* <!-- Login form start --> */}

            <form onSubmit={handleFormSubmit}>
              <Input
                title='Email'
                name='email'
                type='text'
                placeholder='example@gmail.com'
                value={input.email}
                handleInputChange={handleInputChange}
              />
              <Input
                title='Password'
                name='password'
                type='password'
                placeholder='••••••••'
                value={input.password}
                handleInputChange={handleInputChange}
              />
              <div className='flex justify-between w-full py-4'>
                <div className='mr-24'>
                  <label htmlFor='ch'>
                    <input
                      type='checkbox'
                      name='ch'
                      id='ch'
                      className='mr-2'
                    />
                    <span className='text-base'>Remember me</span>
                  </label>
                </div>
                <Link
                  href='/forget'
                  className='font-bold text-base text-blue-900 underline hover:text-red-700 transition'>
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition flex gap-2 justify-center items-center'>
                <p>{isLoading || isSuccess ? 'Please wait....' : 'Sign In'}</p>
              </button>
            </form>

            {/* <!-- Login form end --> */}

            <button className='w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-slate-700 transition-all hover:text-white'>
              <Image
                className='inline mr-2'
                width={24}
                height={24}
                src={googleImg}
                alt='img'
              />
              Sign in with Google
            </button>
            <div className='text-center text-gray-400'>
              {`Dont'have an account?`}
              <Link
                href='/register'
                className='font-bold text-blue-900 ml-2 underline hover:text-red-700 transition'>
                Sign up
              </Link>
            </div>
          </div>

          {/* <!-- right side --> */}
          <div className='relative'>
            <Image
              className='hidden h-full  rounded-r-2xl md:block object-cover'
              width={400}
              height={'100%'}
              src={loginImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
