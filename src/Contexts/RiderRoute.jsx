import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import UseAxiosSecure from './UseAxiosSecure';

const RiderRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const location = useLocation();
  const [isRider, setIsRider] = useState(null); // null = loading

  useEffect(() => {
    const checkRider = async () => {
      if (user?.email) {
        console.log(user.email);
        try {
          const res = await axiosSecure.get(`/users/search?email=${user.email}`);
          setIsRider(res.data?.role === 'rider');
        } catch (err) {
          console.error('Failed to verify rider:', err);
          setIsRider(false);
        }
      } else {
        setIsRider(false);
      }
    };

    checkRider();
  }, [user, axiosSecure]);

  if (loading || isRider === null) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user || !isRider) {
    return <Navigate to="/dashboard/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default RiderRoute;
