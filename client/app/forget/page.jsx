'use client';

import forgetImg from '@/public/image/forgetImg.jpg';
import Image from 'next/image.js';
import Link from 'next/link.js';
import Input from '@/components/Input.jsx';
import { useEffect, useState } from 'react';
import createToast from '@/utils/createToast.jsx';
import BounceLoader from 'react-spinners/BounceLoader';
import { useForgetPasswordRequestMutation } from '@/features/auth/authApiSlice.js';

function Forget() {
  const [input, setInput] = useState({
    email: ''
  });
  const [forgetPasswordRequest, { data, isError, isSuccess, error, isLoading }] = useForgetPasswordRequestMutation();

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle login form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.email) return createToast('Email is required!');

    forgetPasswordRequest({ email: input.email });
  };

  useEffect(() => {
    if (isError) {
      createToast(error.data.message);
    }
    if (isSuccess) {
      createToast(data.message, 'success');
      setInput({ ...input, email: '' });
    }
  }, [isError, isSuccess, error, data]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-2xl font-bold text-primary-gradient'>Forget Password</span>

            {/* <!-- Login form start --> */}

            <form onSubmit={handleFormSubmit}>
              <Input
                title='Email'
                name='email'
                type='text'
                placeholder='your email'
                value={input.email}
                handleInputChange={handleInputChange}
              />

              <button
                type='submit'
                className='w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition flex gap-2 justify-center items-center my-3'>
                <p>{isLoading ? 'Please wait....' : 'Send'}</p>

                {/* <!-- Loading spinner --> */}
                <BounceLoader
                  color={'#ff0000'}
                  loading={isSuccess}
                  cssOverride={{
                    display: 'inline-block',
                    borderColor: 'red'
                  }}
                  size={20}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              </button>
            </form>

            {/* <!-- Login form end --> */}

            <div className='text-center text-gray-400 mt-2'>
              Go to login?
              <Link
                href='/login'
                className='font-bold text-blue-900 ml-2 underline hover:text-red-700 transition'>
                Sign In
              </Link>
            </div>
          </div>

          {/* <!-- right side --> */}
          <div className='relative'>
            <Image
              className='hidden h-full  rounded-r-2xl md:block object-cover'
              width={400}
              height={'100%'}
              src={forgetImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Forget;
