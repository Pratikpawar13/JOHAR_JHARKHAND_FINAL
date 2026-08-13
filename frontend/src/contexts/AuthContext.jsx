import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = authService.getAccessToken();
                if (token) {
                    // First, try to get user from localStorage
                    const storedUser = authService.getUser();
                    if (storedUser) {
                        console.log('Setting user from localStorage:', storedUser);
                        setUser(storedUser);
                        setIsAuthenticated(true);
                    }

                    // Then try to refresh from server
                    const result = await authService.getProfile();
                    if (result.success) {
                        console.log('Updated user from server:', result.user);
                        setUser(result.user);
                        setIsAuthenticated(true);
                    } else if (!storedUser) {
                        // Only clear auth if we didn't have stored user data
                        authService.clearAuth();
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Don't clear auth on network errors if we have stored user data
                const storedUser = authService.getUser();
                if (!storedUser) {
                    authService.clearAuth();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const result = await authService.login(email, password);
            
            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
            }
            
            return result;
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Login failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const result = await authService.register(userData);
            
            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
            }
            
            return result;
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Registration failed. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const result = await authService.updateProfile(profileData);
            
            if (result.success) {
                // Refresh user profile
                const profileResult = await authService.getProfile();
                if (profileResult.success) {
                    setUser(profileResult.user);
                }
            }
            
            return result;
        } catch (error) {
            console.error('Update profile error:', error);
            return {
                success: false,
                message: 'Profile update failed. Please try again.'
            };
        }
    };

    const refreshUser = async () => {
        try {
            const result = await authService.getProfile();
            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            return result;
        } catch (error) {
            console.error('Refresh user error:', error);
            setUser(null);
            setIsAuthenticated(false);
            return { success: false };
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        
        // Helper methods for role checking
        isAdmin: () => {
            console.log('isAdmin check - user:', user);
            console.log('isAdmin check - user?.userType:', user?.userType);
            return user?.userType === 'admin';
        },
        isLocal: () => user?.userType === 'local',
        isTourist: () => user?.userType === 'tourist',
        hasRole: (roles) => roles.includes(user?.userType),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
