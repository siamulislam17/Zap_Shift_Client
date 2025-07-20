import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router';

const Logo = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <div onClick={navigateToHome} className='flex items-center cursor-pointer'>
            <img src={logo}  className='w-7' alt="" />
            <p className='text-2xl font-extrabold relative top-3 right-2 urbanist '>Profast</p>
        </div>
    );
};

export default Logo;