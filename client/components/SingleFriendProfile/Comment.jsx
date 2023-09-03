'use client';

import React, { useState } from 'react';
import AddChildComment from './AddChildComment';
import Image from 'next/image.js';
import ProfileImg from '@/public/image/profile_photo_cat.jpg';


function Comments() {
  const [isCommentDisplay, setIsCommentDisplay] = useState('hidden');
  const show = () => (isCommentDisplay == 'hidden' ? setIsCommentDisplay('') : setIsCommentDisplay('hidden'));

  return (
    <>
      <div className='py-2 px-4'>
        {/* COMMENT */}
        <div className='flex space-x-2'>
          <Image
            src={ProfileImg}
            alt='Profile picture'
            className='w-9 h-9 rounded-full'
          />
          <div>
            <div className='bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm'>
              <span className='font-semibold block'>Can Canbolat</span>
              <span>first comment</span>
            </div>
            <div className='p-2 text-xs text-gray-500 dark:text-dark-txt'>
              <span className='font-semibold cursor-pointer'>Like</span>
              <span className='mx-1'>.</span>
              <span
                className='font-semibold cursor-pointer'
                onClick={show}>
                Reply
              </span>
              <span className='mx-1'>.</span>
              6h
            </div>
            {/* CHILD COMMENT */}
            <div className='flex space-x-2'>
              <Image
                src={ProfileImg}
                alt='Profile picture'
                className='w-9 h-9 rounded-full'
              />
              <div>
                <div className='bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm'>
                  <span className='font-semibold block'>Can Canbolat</span>
                  <span>first child comment</span>
                </div>
                <div className='p-2 text-xs text-gray-500 dark:text-dark-txt'>
                  <span className='font-semibold cursor-pointer'>Like</span>
                  <span className='mr-2'>.</span>
                  <span
                    className='font-semibold cursor-pointer'
                    onClick={show}>
                    Reply
                  </span>
                  <span className='mx-1'>.</span>
                  5h
                </div>
              </div>
            </div>
            {/* ADD CHILD COMMENT */}
            <div className={isCommentDisplay}>
              <AddChildComment />
            </div>
            {/* END ADD CHILD COMMENT */}

            {/* END CHILD COMMENT */}
          </div>
        </div>
        {/* END COMMENT */}
      </div>
    </>
  );
}

export default Comments;
