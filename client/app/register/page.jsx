'use client';

import googleImg from '@/public/image/google.svg';
import registerImg from '@/public/image/register.jpeg';
import Image from 'next/image.js';
import Link from 'next/link.js';
import Input from '@/components/Input.jsx';
import { useEffect, useState } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useRegisterMutation } from '@/features/auth/authApiSlice.js';
import { useRouter } from 'next/navigation.js';
import { isEmail } from '@/helpers/checkMail.js';

function Register() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [register, { isLoading, isSuccess, isError, error, data }] = useRegisterMutation();
  const router = useRouter();

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.username || !input.email || !input.password) {
      return createToast('All fields are required!');
    }

    // email validation check
    if (!isEmail(input.email)) return createToast('Provide a valid email address');
    register(input);
  };

  useEffect(() => {
    if (isError) {
      createToast(error?.data?.message);
    }
    if (isSuccess) {
      createToast(data?.message, 'success');
      setInput({
        username: '',
        email: '',
        password: ''
      });
      router.push('/login');
    }
  }, [isError, error, isSuccess, data, router]);

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          {/* <!-- left side --> */}
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <span className='mb-3 text-4xl font-bold text-primary-gradient'>Register</span>

            {/* <!-- register form  --> */}
            <form
              action=''
              onSubmit={handleFormSubmit}>
              <Input
                title='Name'
                name='username'
                type='text'
                placeholder='you name'
                value={input.username}
                handleInputChange={handleInputChange}
              />
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
              <div className='flex justify-start w-full py-4'>
                <div className='mr-24'>
                  <label htmlFor='ch'>
                    <input
                      type='checkbox'
                      name='ch'
                      id='ch'
                      className='mr-2'
                    />
                    <span className='text-base'>Terms & condition</span>
                  </label>
                </div>
              </div>
              <button className='w-full bg-slate-700 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300 transition '> {isLoading ? 'Please wait...' : 'Sign Up'}</button>
            </form>

            <button className='w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-slate-700 transition-all hover:text-white'>
              <Image
                className='inline mr-2'
                width={24}
                height={24}
                src={googleImg}
                alt='img'
              />
              Sign Up with Google
            </button>
            <div className='text-center text-gray-400'>
              Already have an account?
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
              src={registerImg}
              alt='img'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
