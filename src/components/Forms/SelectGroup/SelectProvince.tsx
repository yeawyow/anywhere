import React from 'react';
import { useEffect, useState } from 'react';

const SelectProvince = () => {
  return (
    <div>
      {' '}
      {/* จังหวัด */}
      <label>จังหวัด</label>
      <select {...register('province_id')}>
        <option value="">เลือกจังหวัด</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
      {/* อำเภอ */}
      <label>อำเภอ</label>
      <select {...register('district_id')} disabled={!selectedProvince}>
        <option value="">เลือกอำเภอ</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
      {/* ตำบล */}
      <label>ตำบล</label>
      <select {...register('sub_district_id')} disabled={!selectedDistrict}>
        <option value="">เลือกตำบล</option>
        {subDistricts.map((subDistrict) => (
          <option key={subDistrict.id} value={subDistrict.id}>
            {subDistrict.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProvince;
