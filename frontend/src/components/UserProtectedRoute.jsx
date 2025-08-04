import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const userAuth = localStorage.getItem('userAuth');
  const userToken = localStorage.getItem('userToken');
  
  if (!userAuth || !userToken) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default UserProtectedRoute;