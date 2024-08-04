import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';
import { jwtDecode } from 'jwt-decode';

type Props = { children: React.ReactNode };

interface DecodedToken {
  role: string;
}

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const decodedToken: DecodedToken = jwtDecode(localStorage.getItem("token") || "");

  return isLoggedIn() && (decodedToken.role === 'User' || decodedToken.role === 'Admin') ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute