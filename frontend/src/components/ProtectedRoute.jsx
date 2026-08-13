import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component for protecting routes that require authentication
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const { isAuthenticated, user, loading } = useAuth();

    // Show loading while auth is being checked
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to auth page with return URL
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.userType)) {
        // User doesn't have required role
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="text-red-500 text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You don't have permission to access this page.
                        <br />
                        Required role: {allowedRoles.join(', ')}
                        <br />
                        Your role: {user?.userType || 'none'}
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

// Component for redirecting authenticated users away from auth pages
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    // Show loading while auth is being checked
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }
    
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

// Higher-order component for pages that work with optional authentication
const OptionalAuthRoute = ({ children }) => {
    // This component doesn't redirect, just passes through
    // The auth state is handled by individual components
    return children;
};

export { ProtectedRoute, PublicRoute, OptionalAuthRoute };
export default ProtectedRoute;
