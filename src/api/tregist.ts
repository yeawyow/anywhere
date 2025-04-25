import api from './axiosInstance';
import { API_POST, API_GET } from '../config/constants';

export const getTeachers = async () => {
  try {
    const response = await api.get(`${API_GET.TEACHERS}`, {
      // withCredentials: true,
    });
    console.log('getteacehr', response.data.message);
    return response.data; // ให้แน่ใจว่ามีข้อมูลใน response.data
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export const registerTecherApi = async (tehcerData: object) => {
  try {
    const response = await api.post(API_POST.REGISTER_TEACHER, tehcerData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering teacher:', error);
    throw error;
  }
};

export const getEducation = async () => {
  try {
    const response = await api.get(`${API_GET.EDUCATIONAL_INSTITUTIONS}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEducationLevel = async () => {
  try {
    const response = await api.get(`${API_GET.EDUCATION_LEVEL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPosition = async () => {
  try {
    const response = await api.get(`${API_GET.POSITION}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
