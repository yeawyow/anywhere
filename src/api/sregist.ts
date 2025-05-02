import api from './axiosInstance';
import { API_GET, API_POST } from '../config/constants';

export const getPrefix = async () => {
  try {
    const response = await api.get(API_GET.PREFIX, {
      withCredentials: true,
    });
    // ส่งกลับแค่ response.data ที่ต้องการ
    return response.data;
  } catch (error) {
    console.error('Error fetching prefix:', error);
    throw error; // โยน error ออกไปให้ component ที่เรียกใช้งานจัดการ
  }
};
export const registerStudentApi = async (studentData: FormData | object) => {
  try {
    const isFormData = studentData instanceof FormData;

    const response = await api.post(API_POST.REGISTER_STUDENT, studentData, {
      withCredentials: true,
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
};

export const getStudent = async () => {
  try {
    const response = await api.get(`${API_GET.STUDENTS}`, {
      // withCredentials: true,
    });
    // console.log('getStudent Response Data:', response.data);
    return response.data.message; // ให้แน่ใจว่ามีข้อมูลใน response.data
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export const getProvince = async () => {
  try {
    const response = await api.get(`${API_GET.PROVINCE}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    throw error;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await api.get(`${API_GET.DISTRICT}${provinceId}`);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getSubDistricts = async (districtId) => {
  try {
    const response = await api.get(`${API_GET.SUBDISTRICTS}${districtId}`);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching subdistricts:', error);
    throw error;
  }
};

export const getEnrollmentYear = async () => {
  try {
    const response = await api.get(`${API_GET.ENROLLMENT_YEARS}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEnrollmentTerm = async () => {
  try {
    const response = await api.get(`${API_GET.ENROLLMENT_TERM}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getEducationalInstitutions = async () => {
  try {
    const response = await api.get(`${API_GET.EDUCATIONAL_INSTITUTIONS}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMarital = async () => {
  try {
    const response = await api.get(`${API_GET.MARITAL_STATUS}`);
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};

export const getOccap = async () => {
  try {
    const response = await api.get(`${API_GET.OCCUPATIONS}`);
    return response.data;
    getSubDistricts;
  } catch (error) {
    throw error;
  }
};
export const getGuardian = async () => {
  try {
    const response = await api.get(`${API_GET.GUARDIAN_RELAT}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSpectial = async () => {
  try {
    const response = await api.get(`${API_GET.SPECTIAL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkUniq = async (
  key: 'email' | 'national_id' | 'student_code',
  value: string,
) => {
  try {
    const response = await api.post(`${API_GET.CHECK_UNIQ}`, {
      [key]: value, // ใช้ dynamic key
    });
    return { duplicated: false }; // ถ้าไม่มีปัญหาซ้ำ
  } catch (error: any) {
    if (error.response?.status === 409) {
      // ตรวจสอบว่ามีข้อความใน response หรือไม่
      const msg = error.response?.data?.message?.message || 'ข้อมูลซ้ำ';
      return { duplicated: true, message: msg }; // ส่งข้อมูลที่มีการซ้ำ
    }
    // ถ้าไม่ใช่ error จากการซ้ำ ก็ throw error ทิ้งไป
    throw error;
  }
};
