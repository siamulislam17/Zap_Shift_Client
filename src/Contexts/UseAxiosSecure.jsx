import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://zap-shift-server-omega.vercel.app/',
});

const UseAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  const isInterceptorAttached = useRef(false); // avoid duplicate interceptors

  useEffect(() => {
    if (!user?.accessToken || isInterceptorAttached.current) return;

    axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    isInterceptorAttached.current = true;
  }, [user?.accessToken]);

  return axiosInstance;
};

export default UseAxiosSecure;
