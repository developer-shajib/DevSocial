'use client';

import Image from 'next/image.js';
import React, { useEffect, useState } from 'react';
import Link from 'next/link.js';
import Avatar from '@/public/image/avatar.jpg';
import CoverImg from '@/public/image/coverImg.jpg';
import { BiSolidDownArrow } from 'react-icons/bi';
import { AiFillCamera } from 'react-icons/ai';
import { Input, Modal } from '@/components';
import { useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import createToast from '@/utils/createToast.jsx';
import { useProfileUpdateMutation } from '@/features/profileUpdate/profileUpdateApiSlice.js';

function ProfileHeader() {
  const { user } = useSelector(getAllAuthState);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
    cover: ''
  });
  const [profileUpdate, { data, isLoading, isSuccess, isError, error }] = useProfileUpdateMutation();

  // <!-- handle edit button -->
  const handleEditBtn = () => {
    setInput({ ...input, username: user?.username, email: user?.email });

    setIsEditModalOpen(true);
  };

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle edit form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // <!-- form validation -->
    if (input.password) {
      if (!input.confirmPassword) {
        return createToast('confirm password is required!');
      }
      if (input.password !== input.confirmPassword) {
        return createToast('Password not match');
      }
    }

    // <!-- form data initialize -->
    const formData = new FormData();
    formData.append('username', input.username);
    formData.append('email', input.email);
    formData.append('password', input.password);

    // <!-- api call -->
    profileUpdate({ id: user?._id, data: formData });
  };

  // <!-- modal close button -->
  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  // <!-- handle profile photo change -->
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    // <!-- for preview image -->
    const url = URL.createObjectURL(file);
    setInput({ ...input, photo: url });

    // <!-- form data initialize -->
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);

    // <!-- api call -->
    profileUpdate({ id: user?._id, data: formData });
  };

  // <!-- handle cover photo change -->
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];

    // <!-- for preview image -->
    const url = URL.createObjectURL(file);
    setInput({ ...input, cover: url });

    // <!-- form data initialize -->
    const formData = new FormData();
    formData.append('cover', e.target.files[0]);

    // <!-- api call -->
    profileUpdate({ id: user?._id, data: formData });
  };

  useEffect(() => {
    if (isError) {
      createToast(error.message);
    }
    if (isSuccess) {
      createToast(data.message, 'success');
      setIsEditModalOpen(false);
    }
  }, [user, isError, error, isSuccess]);

  return (
    <div>
      <div
        className='  flex justify-center w-80 mx-auto'
        style={{ height: '348px' }}>
        <div className='flex flex-col justify-center'>
          <div
            className='md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg flex justify-center mx-auto'
            style={{ width: '940px', height: '348px' }}>
            {input?.cover ? (
              <Image
                className='w-ful h-full bg-cover'
                src={input?.cover}
                alt='cover_img'
                width={940}
                height={940}
              />
            ) : user?.cover ? (
              <Image
                className='w-ful h-full bg-cover'
                src={user?.cover}
                alt='cover_img'
                width={940}
                height={940}
              />
            ) : (
              <Image
                className='w-ful h-full bg-cover'
                src={CoverImg}
                alt='cover_img'
                width={940}
                height={940}
              />
            )}
            <label
              onChange={handleCoverPhotoChange}
              htmlFor='cover_photo'
              type='file'
              className='cursor-pointer absolute bottom-4 right-2 text-black bg-slate-200 ring-4 p-1 offset-4 rounded-full text-xl'>
              <AiFillCamera />
              <input
                className='hidden'
                type='file'
                id='cover_photo'
                accept='image/png,image/jpg, image/jpeg'
              />
            </label>

            {/* // cover photo */}
            <div className='rounded-full absolute top-48 inset-x-96  w-40 h-40'>
              {/* profile photo */}
              <div>
                {input?.photo ? (
                  <Image
                    src={input?.photo}
                    className='rounded-full  border-4 border-white w-40 h-40'
                    width={40}
                    height={40}
                    style={{ width: '168px', height: '168px' }}
                    alt={user?.username}
                  />
                ) : user?.photo ? (
                  <Image
                    src={user?.photo}
                    className='rounded-full  border-4 border-white w-40 h-40'
                    width={40}
                    height={40}
                    style={{ width: '168px', height: '168px' }}
                    alt={user?.username}
                  />
                ) : (
                  <Image
                    width={40}
                    height={40}
                    src={Avatar}
                    className='rounded-full  border-4 border-white w-40 h-40'
                    style={{ width: '168px', height: '168px' }}
                    alt='avatar'
                  />
                )}

                <label
                  onChange={handlePhotoChange}
                  htmlFor='photo'
                  type='file'
                  className='cursor-pointer absolute bottom-4 -right-0 text-black bg-slate-200 ring-4 p-1 offset-4 rounded-full text-xl'>
                  <AiFillCamera />
                  <input
                    className='hidden'
                    type='file'
                    id='photo'
                    accept='image/png,image/jpg, image/jpeg'
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // INFOS */}
      <div className='flex justify-center flex-col mt-5 mb-3.5'>
        <h1 className='text-center font-bold text-3xl mb-2'>{user?.username}</h1>
        <div className='flex items-center gap-4 justify-center'>
          <Link
            href='#'
            className='text-center text-slate-800 font-semibold text-sm'>
            {user?.following?.length} friends
          </Link>
          <button
            onClick={handleEditBtn}
            className='px-3 py-1 rounded-lg bg-slate-200 text-black hover:bg-slate-400 duration-300 transition-all  flex justify-center items-center gap-2'>
            <span className='font-size-lg'>Edit Profile</span>{' '}
            <span>
              <BiSolidDownArrow />
            </span>
          </button>
          {/* <!-- edit form modal --> */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={closeModal}>
            <form onSubmit={handleFormSubmit}>
              <Input
                title='Name'
                name='username'
                type='text'
                placeholder='your name'
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
                <p>Sign in</p>
              </button>
            </form>
          </Modal>
        </div>
        <hr className='full flex self-center w-2/3 mt-2' />
      </div>
      {/* // END INFOS */}
    </div>
  );
}

export default ProfileHeader;
