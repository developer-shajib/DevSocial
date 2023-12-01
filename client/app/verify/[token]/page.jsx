'use client';

import { useRegisterVerifyTokenQuery } from '@/features/auth/authApiSlice.js';
import createToast from '@/utils/createToast.jsx';
import { useParams, useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const VerifyToken = () => {
  const { token } = useParams();
  const router = useRouter();
  const { data, isSuccess, isError, error } = useRegisterVerifyTokenQuery(token);

  useEffect(() => {
    if (isSuccess) {
      Cookies.set('aToken', data?.token);
      createToast(data?.message, 'success');
      router.push('/');
    }
    if (isError) {
      createToast(error?.message);
      router.push('/login');
    }
  }, [isSuccess, data, isError, error, router, Cookies]);
};

export default VerifyToken;
