import axios from 'axios';

// โหลดข้อมูลจังหวัด
export const getProvince = async () => {
  const res = await axios.get(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json',
  );
  return res.data;
};

// โหลดข้อมูลอำเภอตาม province_id
export const getDistricts = async (provinceId: string) => {
  const res = await axios.get(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json',
  );
  return res.data.filter(
    (district: any) => district.province_id === Number(provinceId),
  );
};

// โหลดข้อมูลตำบลตาม district_id
export const getSubDistricts = async (districtId: string) => {
  const res = await axios.get(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json',
  );
  return res.data.filter(
    (subDistrict: any) => subDistrict.amphure_id === Number(districtId),
  );
};
