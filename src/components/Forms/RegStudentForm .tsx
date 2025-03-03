import React, { useState } from 'react';

const RegStudentForm = () => {
  const [formData, setFormData] = useState({
    firstNameTH: '',
    lastNameTH: '',
    firstNameEN: '',
    lastNameEN: '',
    idCardNumber: '',
    birthDate: '',
    gender: '',
    age: '',
    nationality: '',
    religion: '',
    phone: '',
    address: '',
    studentId: '',
    admissionDate: '',
    entryYear: '',
    semester: '',
    level: '',
    classRoom: '',
    majorType: '',
    department: '',
    careerGroup: '',
    lastSchool: '',
    lastDegree: '',
    fatherName: '',
    fatherIdCard: '',
    fatherStatus: '',
    fatherJob: '',
    fatherNationality: '',
    fatherPhone: '',
    motherName: '',
    motherIdCard: '',
    motherStatus: '',
    motherJob: '',
    motherNationality: '',
    motherPhone: '',
    guardianName: '',
    guardianIdCard: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianJob: '',
    guardianNationality: '',
    guardianAddress: '',
    image: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // ส่งข้อมูลไปยัง server หรือทำอย่างอื่น
  };

  return (
    <>
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Personal Information
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Update your details to keep your profile up-to-date.
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Social Links
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div></div>

              <div></div>

              <div></div>

              <div></div>
            </div>
          </div>
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1"></div>

              <div className="col-span-2 lg:col-span-1"></div>

              <div className="col-span-2 lg:col-span-1"></div>

              <div className="col-span-2 lg:col-span-1"></div>

              <div className="col-span-2"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end"></div>
      </form>
    </>
  );
};

export default RegStudentForm;
