'use client';

import Image from 'next/image.js';
import Avatar from '@/public/image/avatar.jpg';
import { GrGallery } from 'react-icons/gr';
import { AiOutlineTags } from 'react-icons/ai';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import { useEffect, useState } from 'react';
import { useCreatePostMutation } from '@/features/post/postApiSlice.js';
import createToast from '@/utils/createToast.jsx';
import BounceLoader from 'react-spinners/BounceLoader';

const CreatePost = () => {
  const { user } = useSelector(getAllAuthState);
  const [input, setInput] = useState({
    text: '',
    postsImage: ''
  });
  const [createPost, { data, isError, isSuccess, error, isLoading }] = useCreatePostMutation();
  const dispatch = useDispatch();

  // <!-- handle input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle Post form submit -->
  const handlePostFormSubmit = (e) => {
    e.preventDefault();

    if (!input.text || !input.postsImage) return createToast('Image or Text is required');

    const formData = new FormData();
    formData.append('postedUserId', user?._id);
    formData.append('text', input.text);
    formData.append('posts', input.postsImage);

    createPost(formData);
  };

  useEffect(() => {
    if (isError) {
      createToast(error.message);
    }
    if (isSuccess) {
      createToast(data?.message, 'success');
      setInput({
        text: '',
        postsImage: ''
      });
    }
  }, [data, isError, error, isSuccess]);

  return (
    <>
      {/* <!-- create post bar --> */}
      <div className='w-full rounded-lg shadow-md p-3 lg:px-6 bg-white mt-6  dark:bg-slate-600 duration-200'>
        <form
          action=''
          onSubmit={handlePostFormSubmit}>
          <div className='flex items-centre justify-start gap-4 border-b-2 border-slate-200 pb-6'>
            {user?.photo ? (
              <Image
                className='rounded-full h-6 w-6 lg:h-14 lg:w-14'
                width={24}
                height={24}
                src={user?.photo}
                alt='name'
              />
            ) : (
              <Image
                width={24}
                height={24}
                className='rounded-full h-6 w-6 lg:h-14 lg:w-14'
                src={Avatar}
                alt='name'
              />
            )}
            <input
              type='text'
              name='text'
              placeholder='Type here....'
              className='px-4  rounded-xl w-full bg-slate-100 focus:outline-none border-b-2 h-10 dark:bg-slate-300 duration-200'
              value={input?.text}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex justify-between gap-4 items-center mt-2 '>
            <div className='hover:bg-slate-100 transition-all duration-300 py-2 px-8 rounded-md cursor-pointer w-1/3 hover:dark:bg-slate-500'>
              <label
                className='flex gap-2 items-center cursor-pointer'
                htmlFor='fileId'>
                <span className=' gallery text-md md:text-2xl text-green-400 cursor-pointer dark:text-slate-600 duration-200'>
                  <GrGallery />
                </span>
                <span className=' text-sm lg:text-md font-semibold cursor-pointer text-slate-600 dark:text-slate-200 duration-200'>Photo/video</span>
              </label>
              <input
                onChange={(e) => setInput({ ...input, postsImage: e.target.files[0] })}
                className='hidden'
                id='fileId'
                type='file'
                accept='image/png,image/jpg, image/jpeg'
              />
            </div>
            <div className='hover:bg-slate-100 flex gap-2 items-center cursor-pointer py-2 px-8 rounded-md w-1/3 justify-center hover:dark:bg-slate-500'>
              <span className='text-md md:text-2xl text-green-400 cursor-pointer dark:text-slate-200 duration-200'>
                <AiOutlineTags />
              </span>
              <span className='text-sm lg:text-md font-semibold cursor-pointer text-slate-600 dark:text-slate-200 duration-200'>Tag</span>
            </div>
            <div className=' flex gap-2 items-center cursor-pointer py-2 px-8 rounded-md w-1/3 justify-center hover:bg-green-400 transition-all   group hover:dark:text-green-800 duration-200 '>
              <button
                type='submit'
                className='text-sm lg:text-md font-semibold cursor-pointer text-slate-600 group-hover:text-white group-hover:dark:text-slate-200 duration-200 dark:text-slate-200'>
                Post
              </button>
              <span className='text-md md:text-2xl text-slate-900 dark:text-slate-200 group-hover:text-white cursor-pointer'>
                <BsArrowRightSquare />
              </span>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className='w-full rounded-lg shadow-md p-3 lg:px-6 bg-white mt-6 '>
          <div className='flex justify-between items-center px-4'>
            <p className=' text-slate-500'>New post is creating...</p>
            <BounceLoader
              color={'#64748b'}
              loading={true}
              cssOverride={{
                display: 'inline-block',
                borderColor: 'red'
              }}
              size={20}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
