import axios from 'axios';
import {
  API_GET_DISTRICT,
  API_GET_PROVINCE,
  API_GET_SUBDISTRICTS,
} from '../config/constants';
import api from './axiosInstance';

// โหลดข้อมูลจังหวัด
export const getProvince = async () => {
  const res = await api.get(`${API_GET_PROVINCE}`);
  return res.data.message;
};

// โหลดข้อมูลอำเภอตาม province_id
export const getDistricts = async (provinceId: number) => {
  const res = await api.get(`${API_GET_DISTRICT}${provinceId}`);
  console.log('datadistbget', res);
  return res.data.message.filter(
    (district: any) => district.province_id === Number(provinceId),
  );
};

export const getSubDistricts = async (districtId: number) => {
  const res = await api.get(`${API_GET_SUBDISTRICTS}${districtId}`);
  console.log('disId', districtId);
  return res.data.message.filter(
    (district: any) => district.district_id === Number(districtId),
  );
};
