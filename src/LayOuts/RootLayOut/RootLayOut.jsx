import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const RootLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;