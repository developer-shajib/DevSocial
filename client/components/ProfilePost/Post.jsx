import React, { useEffect } from 'react';
import Image from 'next/image.js';
import ProfileImg from '@/public/image/profile_photo_cat.jpg';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import Avatar from '@/public/image/avatar.jpg';
import { useDeletePostMutation } from '@/features/post/postApiSlice.js';
import createToast from '@/utils/createToast.jsx';

function Post() {
  const { user, posts } = useSelector(getAllAuthState);
  const allMyPost = posts?.filter((item) => item.postedUserId._id == user?._id);
  const [deletePost, { data, isError, isSuccess, error }] = useDeletePostMutation();

  // <!-- handle delete button -->
  const handleDeleteButton = (id) => {
    deletePost(id);
  };

  useEffect(() => {
    if (isError) {
      createToast(error?.message);
    }
    if (isSuccess) {
      createToast(data?.success);
    }
  }, [isError, error, isSuccess, data]);

  return (
    <div>
      {/* // POST */}
      {allMyPost?.map((item) => (
        <div
          key={item._id}
          className='shadow bg-white mt-4 rounded-lg h-max'>
          {/* POST AUTHOR */}
          <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex space-x-2 items-center'>
                <div className='relative'>
                  {item?.postedUserId?.photo ? (
                    <Image
                      src={item?.postedUserId?.photo}
                      alt='avatar'
                      className='w-10 h-10 rounded-full'
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={Avatar}
                      alt='avatar'
                      className='w-10 h-10 rounded-full'
                      width={40}
                      height={40}
                    />
                  )}

                  <span className='bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2'></span>
                </div>
                <div>
                  <div className='font-semibold'>{item?.postedUserId?.username}</div>
                  <span className='text-sm text-gray-500'>10h</span>
                </div>
              </div>
              <div className='dropdown dropdown-bottom dropdown-end '>
                <label
                  tabIndex={0}
                  className='btn m-1 text-2xl bg-transparent border-none'>
                  <BsThreeDots />
                </label>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2  bg-base-100 rounded-box w-52 shadow-2xl'>
                  <li onClick={() => handleDeleteButton(item?._id)}>
                    <button>Delete</button>
                  </li>
                  <li>
                    <button>Edit</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* END POST AUTHOR */}

          {/* POST CONTENT */}
          <div className='flex flex-col gap-2'>
            <div className='text-justify px-4 py-2'>
              <p>{item?.text}</p>
            </div>
            <div className='w-full'>
              {item?.photos[0] ? (
                <Image
                  src={item?.photos[0]}
                  alt={item?.username}
                  className='w-full h-full '
                  width={600}
                  height={900}
                />
              ) : (
                <Image
                  src={Avatar}
                  alt='avatar'
                  className='w-full h-full '
                  width={600}
                  height={900}
                />
              )}
            </div>
          </div>
          {/* END POST CONTENT */}
          {/* POST EVENTS */}
          <div className='px-4 py-2'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-row-reverse items-center'>
                <span className='ml-2 text-gray-500'>55 like</span>
              </div>
              <div className='text-gray-500'>
                <span
                  onClick=''
                  style={{ cursor: 'pointer' }}>
                  10 comments
                </span>
              </div>
            </div>
          </div>
          {/* END POST EVENTS */}

          {/* POST ACTION */}
          <div className='py-2 px-4'>
            <div className='border border-gray-200 border-l-0 border-r-0 py-1'>
              <div className='flex space-x-2'>
                <div className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500'>
                  <i className='bx bx-like'></i>
                  <span className='text-sm font-semibold'>Like</span>
                </div>
                <div className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500'>
                  <i className='bx bx-comment'></i>
                  <span className='text-sm font-semibold'>Comment</span>
                </div>
                <div className='w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 text-xl py-2 rounded-lg cursor-pointer text-gray-500'>
                  <i className='bx bx-share bx-flip-horizontal'></i>
                  <span className='text-sm font-semibold'>Share</span>
                </div>
              </div>
            </div>
          </div>
          {/* END POST ACTION */}
        </div>
      ))}

      {/* // END POST */}
    </div>
  );
}

export default Post;
