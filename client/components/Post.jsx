'use client';

import Image from 'next/image.js';
import Link from 'next/link.js';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillLike, AiOutlineSend } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BsShareFill } from 'react-icons/bs';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import { useSelector } from 'react-redux';
import { timeAgo } from '@/utils/timeAgo.js';
import { useEffect, useState } from 'react';
import createToast from '@/utils/createToast.jsx';
import { useCreateCommentMutation } from '@/features/comment/commentApiSlice.js';
import { usePostUpdateMutation } from '@/features/post/postApiSlice.js';
import Avatar from '@/public/image/avatar.jpg';

const Post = () => {
  const { user, posts } = useSelector(getAllAuthState);
  const [input, setInput] = useState({});
  const [createComment, { data, isError, isSuccess, isLoading, error }] = useCreateCommentMutation();
  const [postUpdate] = usePostUpdateMutation();

  // <!-- handle Input change -->
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // <!-- handle form submit -->
  const handleFormSubmit = (event, postId) => {
    event.preventDefault();
    if (!input?.[postId]) return createToast('Comment is required!', 'warning');

    createComment({ commentedUserId: user?._id, postId, text: input?.[postId] });

    setInput({ ...input, [postId]: '' });
  };

  // <!-- handle like button -->
  const handleLikeButton = (postId) => {
    postUpdate({ id: postId, data: { like: user?._id } });
  };

  useEffect(() => {
    if (isSuccess) {
      createToast(data.message, 'success');
    }
    if (isError) {
      createToast(error);
    }
  }, [isSuccess, data, isError, error]);

  return (
    <>
      {/* <!-- show post bar --> */}
      {posts &&
        [...posts]?.reverse().map((item) => (
          <div
            className='w-full border-2 border-slate-200 dark:border-slate-600 duration-200 rounded-lg shadow-md p-3 lg:px-6 bg-white mt-6 dark:bg-slate-600 '
            key={item?._id}>
            <div className='flex justify-between '>
              <div className='flex items-center gap-4'>
                <Link href={item?.postedUserId?._id == user?._id ? `/profile` : `/friends/${item?.postedUserId?._id}`}>
                  <Image
                    width={70}
                    height={70}
                    className='rounded-full h-[70px]'
                    src={item?.postedUserId?.photo || Avatar}
                    alt={item?.postedUserId?.username}
                  />
                </Link>
                <div className='flex flex-col'>
                  <Link
                    className='text-lg font-semibold dark:text-slate-200 duration-200'
                    href={item?.postedUserId?._id == user?._id ? `/profile` : `/friends/${item?.postedUserId?._id}`}>
                    {item?.postedUserId?.username}
                  </Link>
                  <span className='text-sm text-slate-400 dark:text-slate-300 duration-200'>{timeAgo(new Date(item.createdAt))}</span>
                </div>
              </div>

              <div className='dropdown dropdown-bottom dropdown-end '>
                <label
                  tabIndex={0}
                  className='btn m-1 text-2xl bg-transparent border-none dark:text-slate-200 duration-200 hover:dark:bg-slate-500'>
                  <BsThreeDots />
                </label>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2  bg-base-100 rounded-box w-52 shadow-2xl dark:bg-slate-300 duration-200'>
                  <li>
                    <a>Hide</a>
                  </li>
                  <li>
                    <a>Notification this post</a>
                  </li>
                </ul>
              </div>
            </div>

            <p className='leading-tight py-4 dark:text-slate-200 duration-200'>{item.text}</p>

            <Image
              className='bg-cover w-full'
              width={100}
              height={100}
              src={item.photos[0]}
              alt='post_name'
            />

            {/* <!-- like & comment --> */}
            <div className='flex flex-col border-t-2 border-slate-200 dark:border-slate-400 duration-200 py-4 w-full'>
              <div className='flex items-center justify-between w-full border-b-2 border-slate-200 dark:border-slate-400 duration-200 mb-2 pb-4'>
                <button className='flex gap-2 items-center dark:text-slate-200 duration-200'>
                  <span>{item.like.length} like</span>
                </button>

                <label
                  htmlFor={item?._id}
                  className='hover:text-blue-400 dark:text-slate-200 duration-200'>
                  {item.comment.length} comment
                </label>
              </div>

              <div className='flex justify-between items-center mb-2'>
                {/* item?.followers?.find((followerItem) => followerItem._id == user?._id) */}
                {item?.like?.find((likeItem) => likeItem._id == user?._id) ? (
                  <>
                    <button
                      onClick={() => handleLikeButton(item._id)}
                      className='w-1/3 hover:bg-slate-200 transition-all duration-300 flex gap-2 items-center  justify-center rounded-lg py-2 hover:dark:bg-slate-400'>
                      <span className='text-blue-500'>
                        <AiFillLike />
                      </span>
                      <span className='text-blue-500'>Liked</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleLikeButton(item._id)}
                      className='w-1/3 hover:bg-slate-200 transition-all duration-300 flex gap-2 items-center  justify-center rounded-lg py-2 dark:border-slate-400 hover:dark:border-slate-200 dark:text-slate-200 hover:dark:bg-slate-400'>
                      <span>
                        <AiFillLike />
                      </span>
                      <span>Like</span>
                    </button>
                  </>
                )}
                <label
                  htmlFor={item._id}
                  className='w-1/3 hover:bg-slate-200 transition-all duration-300 flex gap-2 items-center  justify-center rounded-lg py-2  dark:border-slate-400 hover:dark:border-slate-200 dark:text-slate-200 hover:dark:bg-slate-400'>
                  <span>
                    <FaRegCommentAlt />
                  </span>
                  <span>Comment</span>
                </label>
                {/* <!-- Comment box modal --> */}
                <input
                  type='checkbox'
                  id={item._id}
                  className='modal-toggle'
                />
                <div className='modal '>
                  <div className='modal-box h-[300px] overflow-y-scroll  flex flex-col gap-2 dark:bg-slate-300'>
                    <p className='pb-1 border-b-2 border-slate-200 mb-1'>All Comments</p>

                    <div className='h-full flex-col flex gap-2 '>
                      {item.comment?.map((commentItem) => (
                        <div
                          className='bg-slate-200 gap-2 border-2 rounded-lg p-2'
                          key={commentItem._id}>
                          <div className='flex gap-4 items-center'>
                            {commentItem.commentedUserId?.photo ? (
                              <Image
                                className='w-10 h-10 rounded-full'
                                width={40}
                                height={40}
                                src={commentItem.commentedUserId?.photo}
                                alt='avatar'
                              />
                            ) : (
                              <Image
                                className='w-10 h-10 rounded-full'
                                width={40}
                                height={40}
                                src={Avatar}
                                alt='avatar'
                              />
                            )}

                            <div className='flex flex-col'>
                              <div className='flex gap-4'>
                                <p className='font-bold'>{commentItem.commentedUserId?.username}</p>
                                <span className='text-sm md:text-base'>{timeAgo(new Date(commentItem.createdAt))}</span>
                              </div>
                              <p className='text-slate-600 text-sm md:text-base'>{commentItem?.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <label
                    className='modal-backdrop'
                    htmlFor={item._id}>
                    Close
                  </label>
                </div>
                {/* <!-- Comment box modal End --> */}
                <button className='w-1/3 hover:bg-slate-200 transition-all duration-300 flex gap-2 items-center  justify-center rounded-lg py-2 dark:border-slate-400 hover:dark:border-slate-200 dark:text-slate-200 hover:dark:bg-slate-400'>
                  <span>
                    <BsShareFill />
                  </span>
                  <span>Share</span>
                </button>
              </div>

              {/* <!-- comment form --> */}
              <form
                action=''
                onSubmit={(event) => handleFormSubmit(event, item._id)}>
                <div className='flex items-center justify-between gap-2 border-t-2 border-slate-200 mb-2 pt-4'>
                  {user?.photo ? (
                    <Image
                      className='w-12 h-12 rounded-full'
                      width={12}
                      height={12}
                      src={user?.photo}
                      alt='avatar'
                    />
                  ) : (
                    <Image
                      className='w-12 h-12 rounded-full'
                      width={12}
                      height={12}
                      src={Avatar}
                      alt='avatar'
                    />
                  )}
                  <input
                    value={input?._id}
                    onChange={handleInputChange}
                    name={item._id}
                    className='px-4  rounded-md w-full bg-slate-100 focus:outline-none border-b-2 h-10'
                    type='text'
                    placeholder='write something...'
                  />

                  <button
                    type='submit'
                    className='bg-green-400 px-3 rounded-md text-white py-2 text-2xl hover:bg-slate-300 transition-all duration-300 h-full '>
                    <AiOutlineSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
    </>
  );
};

export default Post;
