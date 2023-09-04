'use client';

import { useRegisterVerifyTokenQuery } from '@/features/auth/authApiSlice.js';
import createToast from '@/utils/createToast.jsx';
import { useParams, useRouter } from 'next/navigation.js';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

const VerifyToken = () => {
  const { token } = useParams();
  const router = useRouter();
  const { data, isSuccess, isError, error } = useRegisterVerifyTokenQuery(token);
  const cookies = new Cookies();

  useEffect(() => {
    if (isSuccess) {
      createToast(data?.message, 'success');
      router.push('/');
      // document.cookie = `aToken=${data.token}`;

      cookies.set('aToken', data?.token);
    }
    if (isError) {
      createToast(error?.message);
      router.push('/login');
    }
  }, [isSuccess, data, isError, error, router]);
};

export default VerifyToken;
