import Image from 'next/image.js';
import Avatar from '@/public/image/avatar.jpg';
import Link from 'next/link.js';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { getAllAuthState } from '@/features/auth/authSlice.js';
import { useProfileUpdateMutation } from '@/features/profileUpdate/profileUpdateApiSlice.js';
import { useEffect } from 'react';
import createToast from '@/utils/createToast.jsx';

const RightSideBar = () => {
  const { user, users } = useSelector(getAllAuthState);
  const withoutMe = users?.filter((item) => item._id != user?._id);
  const [profileUpdate, { data, isError, isSuccess, error, isLoading }] = useProfileUpdateMutation();

  // <!-- handle follow button -->
  const handleFollowBtn = (followingId) => {
    const formData = new FormData();
    formData.append('following', followingId);

    profileUpdate({ id: user?._id, data: formData });
  };

  useEffect(() => {
    if (isError) {
      createToast(error?.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className=''>
        {/* <!-- Active  content --> */}
        <div className=' text-black px-2 mb-4 flex items-center justify-between pt-7 '>
          <p className='text-sm md:text-base dark:text-slate-200'>Active User</p>
          <button className=' rounded-full transition-all hover:text-white duration-300 hover:bg-slate-500 hover:dark:bg-slate-400 p-2 text-slate-800 text-lg md:text-2xl dark:text-slate-200 '>
            <BsThreeDots />
          </button>
        </div>

        <hr />

        {/* <!-- menu button --> */}
        <div>
          <div className='hover:bg-gray-100 hover:dark:bg-slate-400 transition-all text-slate-500 px-4 py-2 rounded-md'>
            <Link
              href='#'
              className='flex items-center gap-2 md:gap-6'>
              <div className='avatar online placeholder'>
                <div className='bg-neutral-focus text-neutral-content rounded-full w-8'>
                  <Image
                    className='rounded-full h-8 w-8'
                    src={Avatar}
                    alt='name'
                  />
                </div>
              </div>
              <span className='text-sm font-medium dark:text-slate-200'>Md Rakib</span>
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- suggest  content --> */}
      <div className=''>
        <div className=' text-black px-2 mb-4 flex items-center justify-between pt-7'>
          <p className='text-sm md:text-base dark:text-slate-200'>Suggest for you</p>
          <button className=' rounded-full transition-all hover:text-white duration-300 hover:bg-slate-500  dark-bg-slate-200 p-2 text-slate-800 text-lg md:text-2xl  '>
            <BsThreeDots />
          </button>
        </div>

        <hr />

        {/* <!-- menu button --> */}

        <div>
          {withoutMe?.map((item) => {
            return (
              <div
                key={item._id}
                className='hover:bg-gray-100 hover:dark:bg-slate-400 transition-all text-slate-500 px-4 py-2 rounded-md'>
                <div className='flex items-center gap-1 md:gap-6'>
                  <div className='avatar online placeholder hover:outline-2 outline-green-500'>
                    <div className='bg-neutral-focus text-neutral-content rounded-full w-8 '>
                      <Link href={`/friends/${item?._id}`}>
                        {item?.photo ? (
                          <Image
                            className='rounded-full h-9 w-9'
                            width={36}
                            height={36}
                            src={item?.photo}
                            alt='name'
                          />
                        ) : (
                          <Image
                            className='rounded-full h-8 w-8'
                            width={32}
                            height={32}
                            src={Avatar}
                            alt='avatar'
                          />
                        )}
                      </Link>
                    </div>
                  </div>

                  <div className='flex items-start flex-col lg:flex-row  lg:justify-between lg:items-center w-full'>
                    <Link
                      href={`/friends/${item?._id}`}
                      className='text-sm font-medium items-center hover:text-blue-600 transition-all duration-300 hover:underline dark:text-slate-200'>
                      {item?.username}
                    </Link>
                    {item?.followers?.find((followerItem) => followerItem._id == user?._id) ? (
                      <button
                        onClick={() => handleFollowBtn(item?._id)}
                        className='text-sm bg-error text-white rounded px-3 py-1'>
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollowBtn(item?._id)}
                        className='text-sm bg-success text-white rounded px-3 py-1 hover:bg-blue-700 transition-all shadow-lg'>
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RightSideBar;
