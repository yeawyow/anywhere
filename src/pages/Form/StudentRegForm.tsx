import { useState, useEffect } from 'react';
import { getPrefix } from '../../api/sregist';
import axios from 'axios';

interface Prefix {
  id: string; // กำหนดประเภทของ 'id'
  name: string; // กำหนดประเภทของ 'name'
}

interface Nationality {
  id: string;
  name: string;
}

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    prefix_id: '',
    engName: '',
    nationality: '',
    religion: '',
    school: '',
  });

  // กำหนดประเภทข้อมูลให้กับ state
  const [prefixes, setPrefixes] = useState<Prefix[]>([]); // คำนำหน้า
  const [nationalities, setNationalities] = useState<Nationality[]>([]); // รายการสัญชาติ

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrefixes = await getPrefix();
        setPrefixes(fetchedPrefixes); // อัปเดต state คำนำหน้า

        const token = localStorage.getItem('token');
        const natRes = await axios.get('/api/nationalities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNationalities(natRes.data); // อัปเดต state สัญชาติ
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      {/* Input ชื่อ-สกุล (อังกฤษ) */}
      <input
        type="text"
        name="engName"
        value={formData.engName}
        onChange={handleChange}
        placeholder="ชื่อ-สกุล (อังกฤษ)"
      />

      {/* Select คำนำหน้า */}
      <select
        name="prefix_id"
        value={formData.prefix_id}
        onChange={handleChange}
      >
        <option value="">เลือกคำนำหน้า</option>
        {prefixes.map((prefix) => (
          <option key={prefix.id} value={prefix.id}>
            {prefix.name}
          </option>
        ))}
      </select>

      {/* Select สัญชาติ */}
      <select
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
      >
        <option value="">เลือกสัญชาติ</option>
        {nationalities.map((nat) => (
          <option key={nat.id} value={nat.name}>
            {nat.name}
          </option>
        ))}
      </select>

      <button type="submit">ลงทะเบียน</button>
    </form>
  );
};

export default StudentRegister;
