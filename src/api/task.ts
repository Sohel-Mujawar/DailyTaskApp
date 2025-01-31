import {useQuery} from '@tanstack/react-query';
import api from './axiosInstance';

export const getTask = async (userid: string) => {
  if (!userid) {
    console.error('sdfsffs userId is undefined!');
    return;
  }
  try {
    const response = await api.get(`tasks/${userid}`);
    console.log('Task data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};

export const useGetTask = (userid: string) => {
  return useQuery({
    queryKey: ['task', userid], // Use an array instead of concatenating strings
    queryFn: async () => {
      const data = await getTask(userid);
      if (!data) {
        throw new Error('No data found');
      }
      return data;
    },
  });
};
