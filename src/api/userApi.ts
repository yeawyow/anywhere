import api from './axiosInstance';
import { API_GET, API_POST } from '../config/constants';

export const getUsers = async () => {
  try {
    const response = await api.get(`${API_GET.USERS}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
