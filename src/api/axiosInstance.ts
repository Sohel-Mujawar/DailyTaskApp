import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for the API
// const API_BASE_URL = 'http://192.168.29.226:3000/api/'
// const API_BASE_URL = 'https://vp75lkx6-3000.inc1.devtunnels.ms/api/'
// const API_BASE_URL = 'http://192.168.29.45:3000/api/'
const API_BASE_URL = 'http://192.168.29.5:3000/';
// const API_BASE_URL = 'http://localhost:3000/';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Set a timeout for requests
});

// Request Interceptor
api.interceptors.request.use(
  async config => {
    // Add authorization token or any headers if needed
    const token = await getToken(); // Replace with your token fetch logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  response => {
    // Handle response data
    return response;
  },
  error => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response);
    } else if (error.request) {
      // No response received from server
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  },
);

// Example function to fetch the token (You should replace this with your logic)
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export default api;
