import axios from 'axios';
import React from 'react';

const UseAsios = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://zap-shift-server-omega.vercel.app/',

});
    return (
        axiosInstance
    );
};

export default UseAsios;