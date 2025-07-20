import React from 'react';
import { Outlet } from 'react-router';
import img from '../../assets/authImage.png';
import Logo from '../../Components/Logo';

const AuthLayOut = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      {/* Logo */}
      <div className="mb-6  absolute top-4 left-3">
        <Logo />
      </div>

      {/* Main auth container */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 w-full max-w-6xl dark:bg-gray-800 bg-gray-100 p-6 rounded-xl shadow-md">
        {/* Form section */}
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>

        {/* Image section */}
        <div className="w-full md:w-1/2">
          <img src={img} alt="auth visual" className="w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayOut;
