import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    // Redirect to login and save current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in
  return children;
};

export default PrivateRoute;
