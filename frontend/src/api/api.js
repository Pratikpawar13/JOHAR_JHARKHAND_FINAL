// src/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Enable credentials for CORS
});

// Request interceptor for logging and auth
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    
    // Add auth token if available
    const token = localStorage.getItem('jharkhand_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('Response error:', error);
    
    // Handle token expiration
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('jharkhand_refresh_token');
      
      if (refreshToken && !error.config._retry) {
        error.config._retry = true;
        
        try {
          const response = await axios.post('http://localhost:3000/api/auth/refresh-token', {
            refreshToken
          });
          
          if (response.data.success) {
            localStorage.setItem('jharkhand_access_token', response.data.accessToken);
            error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api.request(error.config);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Clear auth data and redirect to login
          localStorage.removeItem('jharkhand_access_token');
          localStorage.removeItem('jharkhand_refresh_token');
          localStorage.removeItem('jharkhand_user');
          window.location.href = '/auth';
        }
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection and try again.';
    } else if (error.code === 'ERR_NETWORK') {
      error.message = 'Network error. Please check if the server is running.';
    } else if (!error.response) {
      error.message = 'Unable to connect to server. Please try again later.';
    }
    
    return Promise.reject(error);
  }
);

// Example: Get Sentiment Data
export async function getSentimentData(text) {
  try {
    const response = await api.post('/sentiment', { feedback: text, includeEmotions: true });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Analyze batch sentiment
export async function analyzeBatchSentiment(feedbackList) {
  try {
    const response = await api.post('/sentiment/batch', { feedbacks: feedbackList });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get sentiment summary
export async function getSentimentSummary(feedbackList) {
  try {
    const response = await api.post('/sentiment/summary', { feedbacks: feedbackList });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Submit feedback
export async function submitFeedback(feedbackData) {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get feedback statistics
export async function getFeedbackStats() {
  try {
    const response = await api.get('/feedback/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get all feedback (admin)
export async function getAllFeedback() {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get feedback by location
export async function getFeedbackByLocation(location) {
  try {
    const response = await api.get(`/feedback/location/${encodeURIComponent(location)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Contact form submission
export async function contact(info) {
  try {
    console.log(info);
    const response = await api.post('/contactus', { info });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Health check
export async function healthCheck() {
  try {
    const response = await api.get('/', { 
      baseURL: 'http://localhost:3000' // Override base URL for health check
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Export the axios instance as default
export default api;
