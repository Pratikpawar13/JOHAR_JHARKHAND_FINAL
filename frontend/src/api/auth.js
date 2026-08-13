import api from './api';

class AuthService {
    constructor() {
        this.TOKEN_KEY = 'jharkhand_access_token';
        this.REFRESH_TOKEN_KEY = 'jharkhand_refresh_token';
        this.USER_KEY = 'jharkhand_user';
    }

    // Register new user
    async register(userData) {
        try {
            console.log('Sending registration data:', userData);
            const response = await api.post('/auth/register', userData);
            
            console.log('Registration response:', response.data);
            
            if (response.data.success) {
                // Store tokens and user data
                this.setTokens(response.data.tokens);
                this.setUser(response.data.user);
                
                return {
                    success: true,
                    user: response.data.user,
                    message: response.data.message
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Registration failed'
            };
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Error response:', error.response?.data);
            
            if (error.response?.data) {
                return {
                    success: false,
                    message: error.response.data.message || 'Registration failed',
                    errors: error.response.data.errors
                };
            }
            
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    }

    // Login user
    async login(email, password) {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            if (response.data.success) {
                // Store tokens and user data
                this.setTokens(response.data.tokens);
                this.setUser(response.data.user);
                
                return {
                    success: true,
                    user: response.data.user,
                    message: response.data.message
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Login failed'
            };
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.response?.data) {
                return {
                    success: false,
                    message: error.response.data.message || 'Login failed'
                };
            }
            
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    }

    // Logout user
    async logout() {
        try {
            const refreshToken = this.getRefreshToken();
            
            if (refreshToken) {
                await api.post('api/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call success
            this.clearAuth();
        }
    }

    // Refresh access token
    async refreshAccessToken() {
        try {
            const refreshToken = this.getRefreshToken();
            
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await api.post('/auth/refresh-token', { refreshToken });
            
            if (response.data.success) {
                this.setAccessToken(response.data.accessToken);
                return response.data.accessToken;
            }
            
            throw new Error('Token refresh failed');
        } catch (error) {
            console.error('Token refresh error:', error);
            this.clearAuth();
            throw error;
        }
    }

    // Get user profile
    async getProfile() {
        try {
            const response = await api.get('/auth/profile');
            
            if (response.data.success) {
                this.setUser(response.data.user);
                return {
                    success: true,
                    user: response.data.user
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch profile'
            };
        } catch (error) {
            console.error('Get profile error:', error);
            
            if (error.response?.status === 401) {
                this.clearAuth();
            }
            
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch profile'
            };
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            const response = await api.put('/auth/profile', profileData);
            
            if (response.data.success) {
                // Refresh user profile after update
                await this.getProfile();
                
                return {
                    success: true,
                    message: response.data.message
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Profile update failed'
            };
        } catch (error) {
            console.error('Update profile error:', error);
            
            return {
                success: false,
                message: error.response?.data?.message || 'Profile update failed'
            };
        }
    }

    // Token management
    setTokens(tokens) {
        if (tokens.accessToken) {
            localStorage.setItem(this.TOKEN_KEY, tokens.accessToken);
        }
        if (tokens.refreshToken) {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        }
    }

    setAccessToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getAccessToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    // User data management
    setUser(user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem(this.USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    // Authentication state
    isAuthenticated() {
        return !!this.getAccessToken();
    }

    // Clear authentication data
    clearAuth() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    // Get authorization header
    getAuthHeader() {
        const token = this.getAccessToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

// Create singleton instance
const authService = new AuthService();

// Setup axios interceptors for automatic token handling
api.interceptors.request.use((config) => {
    const token = authService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Setup axios interceptors for automatic token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && 
            error.response?.data?.code === 'TOKEN_EXPIRED' && 
            !originalRequest._retry) {
            
            originalRequest._retry = true;

            try {
                const newToken = await authService.refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                authService.clearAuth();
                window.location.href = '/auth';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default authService;
