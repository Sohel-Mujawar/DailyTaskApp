import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from './axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login API call
const login = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', email, password);
    const response = await api.post('auth/login', {email, password});

    console.log('Login API Response:', response.data); // Log full response

    const token = response.data?.data?.token; // Correctly access token inside 'data'

    if (token) {
      await AsyncStorage.setItem('token', token);
      console.log('Token stored successfully:', token);
    } else {
      console.error('No token found in response:', response.data);
      throw new Error('No token found in response');
    }

    return response.data;
  } catch (error: any) {
    console.error('Login Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Network error');
  }
};

export const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/auth/register', {name, email, password});
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || 'An error occurred during signup',
      );
    }
    throw new Error('Network error');
  }
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {name: string; email: string; password: string}) =>
      signup(data),
    onSuccess: data => {
      console.log('User registered successfully:', data);
      // Optionally invalidate or refetch queries related to users
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
    },
    onError: (error: any) => {
      console.error('Error during user registration:', error.message);
    },
  });
};
// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({email, password}: {email: string; password: string}) =>
      login(email, password),
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
    onSuccess: data => {
      // Handle success, for example, save token or perform navigation
      console.log('Login successful', data);
    },
    onError: (error: Error) => {
      // Handle error, show a message to the user
      console.error('Login failed:', error.message);
    },
  });
};
