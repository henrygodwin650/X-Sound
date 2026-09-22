import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../backend/firebase'
import LoadingScreen from '../Skeleton/LoadingScreen';

const ProtectedRoutes = ({ loading }) => {
  const user = auth.currentUser;

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoutes