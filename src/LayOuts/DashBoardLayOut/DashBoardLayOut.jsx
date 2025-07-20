import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router'; // Correct import
import { 
  FaHome, 
  FaBoxOpen, 
  FaPaperPlane, 
  FaHistory, 
  FaUsers, 
  FaUserCheck, 
  FaSearchLocation, 
  FaUserPlus, 
  FaMotorcycle,
  FaTruck,
  FaCheckCircle,
  FaMoneyCheckAlt
} from 'react-icons/fa';
import Logo from '../../Components/Logo';
import useAxiosSecure from '../../Contexts/UseAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext';

const DashBoardLayOut = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRider, setIsRider] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/search?email=${user.email}`);
          if (res.data?.role === 'admin') {
            setIsAdmin(true);
          }
          if (res.data?.role === 'rider') {
            setIsRider(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkAdmin();
  }, [user, axiosSecure]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar (Mobile) */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <Logo />
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-base-200">
        <label htmlFor="my-drawer-3" className="drawer-overlay lg:hidden"></label>
        <div className="m-3 hidden lg:block">
          <Logo />
        </div>

        <ul className="menu p-4 gap-y-2 lg:w-72 h-full text-base-content bg-base-200 shadow-inner">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
              }`
            }
          >
            <FaHome /> <span>Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/my-parcels"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
              }`
            }
          >
            <FaBoxOpen /> <span>My Parcels</span>
          </NavLink>

          

          <NavLink
            to="/dashboard/payment-history"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
              }`
            }
          >
            <FaHistory /> <span>Payment History</span>
          </NavLink>

          {/* ✅ Admin-only links */}
          {isAdmin && (
            <>
              <NavLink
                to="/dashboard/active-riders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
                  }`
                }
              >
                <FaUserCheck /> <span>Active Riders</span>
              </NavLink>

              <NavLink
                to="/dashboard/pending-riders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
                  }`
                }
              >
                <FaUsers /> <span>Pending Riders</span>
              </NavLink>

              <NavLink
                to="/dashboard/add-admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
                  }`
                }
              >
                <FaUserPlus /> <span>Add Admin</span>
              </NavLink>

              <NavLink
              to="/dashboard/assign-rider"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
                }`
              }
            >
              <FaMotorcycle /> <span>Assign Rider for Parcel</span>
            </NavLink>


            <NavLink
            to="/dashboard/assign-parcel"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
              }`
            }
          >
            <FaMotorcycle /> <span>Assigned Parcels</span>
          </NavLink>


          <NavLink
            to="/dashboard/delivered-parcels-admin-view"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'active' : 'hover:bg-green-100 text-gray-700'
              }`
            }
          >
            <FaCheckCircle /> <span>Delivered Parcels</span>
          </NavLink>


          


            </>
          )}

         {isRider && (
                  <>
                    <NavLink
                      to="/dashboard/pending-delivery"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                          isActive ? 'active' : 'hover:bg-yellow-100 text-gray-700'
                        }`
                      }
                    >
                      <FaTruck /> <span>Pending Deliveries</span>
                    </NavLink>

                    <NavLink
                      to="/dashboard/completed-deliveries"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                          isActive ? 'active' : 'hover:bg-yellow-100 text-gray-700'
                        }`
                      }
                    >
                      <FaCheckCircle /> <span>Completed Deliveries</span>
                    </NavLink>


                   

                  </>
                )}


          
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
