'use client';

import { useRegisterVerifyTokenQuery } from '@/features/auth/authApiSlice.js';
import createToast from '@/utils/createToast.jsx';
import { useParams, useRouter } from 'next/navigation.js';
import { useEffect } from 'react';

const VerifyToken = () => {
  const { token } = useParams();
  const router = useRouter();
  const { data, isSuccess, isError, error } = useRegisterVerifyTokenQuery(token);

  useEffect(() => {
    if (isSuccess) {
      createToast(data?.message, 'success');
      router.push('/');
      document.cookie = `aToken=${data.token}`;
    }
    if (isError) {
      createToast(error?.message);
      router.push('/login');
    }
  }, [isSuccess, data, isError, error, router]);
};

export default VerifyToken;
