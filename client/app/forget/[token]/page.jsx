'use client';

import resetImg from '@/public/image/resetImg.png';
import Image from 'next/image.js';
import Link from 'next/link.js';
import Input from '@/components/Input.jsx';
import { useEffect, useState } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useParams, useRouter } from 'next/navigation.js';
import BounceLoader from 'react-spinners/BounceLoader';
import { useResetPasswordMutation } from '@/features/auth/authApiSlice.js';

function ForgetPasswordReset() {
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });
  const [resetPassword, { data, isError, isSuccess, error, isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const { token } = useParams();

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle login form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // <!-- form validation -->
    if (!input.confirmPassword || !input.password) return createToast('All fields are required!');

    if (input.password !== input.confirmPassword) return createToast('Confirm password not match!');

    // <!-- send to server by api -->
    resetPassword({ token, data: { password: input.password, confirmPassword: input.confirmPassword } });
  };

  useEffect(() => {
    if (isError) {
      createToast(error.data.message);
      router.push('/forget');
    }
    if (isSuccess) {
      createToast(data.message, 'success');

      router.push('/login');
    }
  }, [isError, isSuccess, error, data, router]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-2xl font-bold text-primary-gradient'>Reset your password</span>

            {/* <!-- Login form start --> */}

            <form onSubmit={handleFormSubmit}>
              <Input
                title='New Password'
                name='password'
                type='password'
                placeholder=''
                value={input.password}
                handleInputChange={handleInputChange}
              />
              <Input
                title='Confirm Password'
                name='confirmPassword'
                type='password'
                placeholder=''
                value={input.confirmPassword}
                handleInputChange={handleInputChange}
              />

              <button
                type='submit'
                className='w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition flex gap-2 justify-center items-center'>
                <p>{isLoading ? 'Please wait....' : 'Apply'}</p>

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

            <div className='text-center text-gray-400'>
              Go Back?
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
              src={resetImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPasswordReset;
