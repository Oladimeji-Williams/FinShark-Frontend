import { useAuth } from '@/Components/Providers/AuthProvider';
import React from 'react'
import { Navigate, useLocation } from 'react-router';

type Props = {
    children: React.ReactNode
}

const ProtectedRoutes = (props: Props) => {
    const location = useLocation();
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? (
        <>{props.children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoutes