import axios from 'axios';

// API Base URL - change this based on your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://improve-my-city-backend-main.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================
export const authAPI = {
  // User Registration
  register: async (data: {
    username: string;
    email: string;
    password: string;
    mobile: string;
    address: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Send OTP for login
  sendOTP: async (email: string) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  },

  // Verify OTP and login
  verifyOTP: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // User Login with password (alternative to OTP)
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Admin Login
  adminLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/admin-login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// ==================== COMPLAINT APIs ====================
export const complaintAPI = {
  // Create a new complaint
  create: async (formData: FormData) => {
    const response = await api.post('/complaints', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all public complaints (for City Complaints page)
  getPublicComplaints: async (params?: {
    category?: string;
    status?: string;
    search?: string;
  }) => {
    const response = await api.get('/complaints/public', { params });
    return response.data;
  },

  // Get user's own complaints (for My Complaints page)
  getMyComplaints: async (status?: string) => {
    const response = await api.get('/complaints/my-complaints', {
      params: { status },
    });
    return response.data;
  },

  // Get complaint by ID with full details
  getComplaintById: async (id: string) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },

  // Upvote a complaint
  upvoteComplaint: async (id: string) => {
    const response = await api.post(`/complaints/${id}/upvote`);
    return response.data;
  },

  // Remove upvote
  removeUpvote: async (id: string) => {
    const response = await api.delete(`/complaints/${id}/upvote`);
    return response.data;
  },
};

// ==================== ADMIN COMPLAINT APIs ====================
export const adminComplaintAPI = {
  // Get all complaints for admin (with filters)
  getAllComplaints: async (params?: {
    category?: string;
    status?: string;
    sortBy?: string;
  }) => {
    const response = await api.get('/admin/complaints', { params });
    return response.data;
  },

  // Assign complaint to admin (mark as in-progress)
  assignComplaint: async (id: string) => {
    const response = await api.put(`/admin/complaints/${id}/assign`);
    return response.data;
  },

  // Update complaint status
  updateComplaintStatus: async (id: string, status: string) => {
    const response = await api.put(`/admin/complaints/${id}/status`, { status });
    return response.data;
  },
};

// ==================== ANNOUNCEMENT APIs ====================
export const announcementAPI = {
  // Get all announcements (public)
  getAll: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },

  // Create announcement (admin only)
  create: async (data: {
    title: string;
    body: string;
    category: string;
  }) => {
    const response = await api.post('/admin/announcements', data);
    return response.data;
  },

  // Update announcement (admin only)
  update: async (id: string, data: {
    title: string;
    body: string;
    category: string;
  }) => {
    const response = await api.put(`/admin/announcements/${id}`, data);
    return response.data;
  },

  // Delete announcement (admin only)
  delete: async (id: string) => {
    const response = await api.delete(`/admin/announcements/${id}`);
    return response.data;
  },
};

// ==================== USER PROFILE APIs ====================
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: {
    username?: string;
    mobile?: string;
    address?: string;
  }) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    const response = await api.post('/users/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// ==================== ANALYTICS APIs ====================
export const analyticsAPI = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await api.get('/analytics/stats');
    return response.data;
  },

  // Get category-wise complaint distribution
  getCategoryDistribution: async () => {
    const response = await api.get('/analytics/category-distribution');
    return response.data;
  },

  // Get weekly trends
  getWeeklyTrends: async () => {
    const response = await api.get('/analytics/weekly-trends');
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async () => {
    const response = await api.get('/analytics/recent-activities');
    return response.data;
  },
};

export default api;
