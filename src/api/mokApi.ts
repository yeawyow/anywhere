export const getNational = async () => {
  // ข้อมูล mock
  return {
    message: [
      { id: 1, national_name_thai: 'ไทย' },
      { id: 2, national_name_thai: 'จีน' },
      { id: 3, national_name_thai: 'อังกฤษ' },
    ],
  };
};
export const getethnicity = async () => {
  // ข้อมูล mock
  return {
    message: [
      { id: 1, ethnicity_name_thai: 'ไทย' },
      { id: 2, ethnicity_name_thai: 'จีน' },
      { id: 3, ethnicity_name_thai: 'อังกฤษ' },
    ],
  };
};
