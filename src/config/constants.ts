// export const API_URL = "http://localhost:3000";
export const API_GET = {
  PREFIX: '/getPrefix',
  PROVINCE: '/getProvince',
  ENROLLMENT_YEARS: '/getEnrollmentYear',
  ENROLLMENT_TERM: '/getENrollmentTerm',
  MARITAL_STATUS: '/getMaritalStatus',
  EDUCATIONAL_INSTITUTIONS: '/getEducationalInstitutions',
  OCCUPATIONS: '/getOccupations',
  RELATIONS: '/getRelations',
  EDUCATION_LEVEL: '/getEducationLevel',
  SPECIALIZATIONS: '/getSpecializations',
  TEACHERS: '/getTeachers',
  STUDENTS: '/getStudents',
  GUARDIAN_RELAT: '/getRelations',
  SPECTIAL: '/getSpecializations',
  DISTRICT: '/getDistrictByProvinceId/',
  SUBDISTRICTS: '/getSubDistrictByDistrictId/',
  POSITION: '/getPosition',
  USERS: '/',
};

export const API_POST = {
  LOGIN: '/authLogin',
  LOGOUT: '/authLogout',
  VERIFY: '/authVerify',
  REGISTER_STUDENT: '/registerStudent',
  REGISTER_TEACHER: '/registerTeacher',
};
export const APP_NAME = 'ระบบการจัดการเรียนรู้ ANYWHERE ANYTIME';
export const INSTITUION = 'ATEC INTER ASIA  ';
export const MAX_ITEMS_PER_PAGE = 10;
