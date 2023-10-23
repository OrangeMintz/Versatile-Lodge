// In RequireAuth.jsx
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles, redirectTo }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth?.user) {
        // User is not authenticated; redirect to the login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length === 0 || (allowedRoles.includes('admin') && auth?.isAdmin)) {
        // User has "admin" role or no specific roles required; allow access
        return <Outlet />;
    } else if (allowedRoles.includes('employee') && auth?.isEmployee) {
        // User has "employee" role and isEmployee is true; allow access to employee route
        return <Outlet />;
    } else {
        // User is authenticated but doesn't have the required role; redirect to unauthorized or a custom route
        return <Navigate to={redirectTo || '/unauthorized'} state={{ from: location }} replace />;
    }
};

export default RequireAuth;
