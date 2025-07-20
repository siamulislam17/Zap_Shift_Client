import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOutUser } = use(AuthContext)

    const handleLogout = () => {
        logOutUser()
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Logout Successful!',
                icon: 'success',
            })
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
            })
        });
    }

    const navItems = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="/coverage" className={({ isActive }) => isActive ? 'active' : ''}>Coverage</NavLink></li>
        {
            user && <li><NavLink to="/dashboard/my-parcels" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        }
        <li><NavLink to="/send-parcel" className={({ isActive }) => isActive ? 'active' : ''}>Send Parcel</NavLink></li>
        <li><NavLink to="/be-a-rider" className={({ isActive }) => isActive ? 'active' : ''}>Be A Rider</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 dark:bg-gray-800 md:pb-3 shadow-sm  sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  w-52 p-2 shadow">
                    {navItems}
                </ul>
                </div>
                <Link to="/" className='md:ml-5'>
                    <Logo></Logo>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user?
                 <button onClick={handleLogout} className="btn btn-primary">Logout</button>:
                 <>
                 <Link to="/login" className="btn btn-primary">Login</Link>
                 <Link to="/register" className="btn btn-primary ml-2">Register</Link>
                 </>}
            </div>
            </div>
    );
};

export default Navbar;