import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import UseAxiosSecure from './UseAxiosSecure';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null); // null = loading

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/search?email=${user.email}`);
          setIsAdmin(res.data?.role === 'admin');
        } catch (err) {
          console.error('Failed to verify admin:', err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user, axiosSecure]);

  if (loading || isAdmin === null) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/dashboard/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
