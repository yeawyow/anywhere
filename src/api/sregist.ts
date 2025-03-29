import api from './axiosInstance';
import {
  API_GET_PREFIX,
  API_GET_PROVINCE,
  API_GET_DISTRICT,
  API_GET_SUBDISTRICTS,
  API_GET_STUDENT,
  API_REGIST_STUDENT,
  API_GET_ENROLLMENT_YEARS,
  API_GET_ENROLLMENT_TERM,
  API_GET_EDUINSTITU,
} from '../config/constants';

export const getPrefix = async () => {
  try {
    const response = await api.get(API_GET_PREFIX, {
      withCredentials: true,
    });
    // ส่งกลับแค่ response.data ที่ต้องการ
    return response.data;
  } catch (error) {
    console.error('Error fetching prefix:', error);
    throw error; // โยน error ออกไปให้ component ที่เรียกใช้งานจัดการ
  }
};
export const registerStudentApi = async (studentData: object) => {
  try {
    const response = await api.post(API_REGIST_STUDENT, studentData, {
      withCredentials: true,
    });
    console.log('registerStudent Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
};
export const getStudent = async () => {
  try {
    const response = await api.get(`${API_GET_STUDENT}`, {
      // withCredentials: true,
    });
    console.log('getStudent Response Data:', response.data);
    return response.data.message; // ให้แน่ใจว่ามีข้อมูลใน response.data
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export const getProvince = async () => {
  try {
    const response = await api.get(`${API_GET_PROVINCE}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDistricts = async (provinceId: string) => {
  try {
    const response = await api.post(`${API_GET_DISTRICT}`, { provinceId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubDistricts = async (districtId) => {
  try {
    const response = await api.post(
      `${API_GET_SUBDISTRICTS}`,
      { districtId },
      {
        withCredentials: true,
      },
    );
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};

export const getEnrollmentYear = async () => {
  try {
    const response = await api.get(`${API_GET_ENROLLMENT_YEARS}`);
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};
export const getEnrollmentTerm = async () => {
  try {
    const response = await api.get(`${API_GET_ENROLLMENT_TERM}`);
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};
export const getEducationalInstitutions = async () => {
  try {
    const response = await api.get(`${API_GET_EDUINSTITU}`);
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};
