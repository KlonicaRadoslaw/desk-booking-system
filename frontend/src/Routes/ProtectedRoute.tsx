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

  let role = "";
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const decodedToken: DecodedToken = jwtDecode(token);
            role = decodedToken.role;
        } catch (error) {
            console.error("Invalid token specified", error);
        }
    }

  return isLoggedIn() && (role === 'User' || role === 'Admin') ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute