// ฟังก์ชั่นสำหรับตรวจสอบความถูกต้องของเลขบัตรประชาชน
export function isValidNationalId(id: string): boolean {
  if (id.length !== 13) return false;

  const digits = id.split('').map(Number);
  const weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // ตัวเลขที่ใช้คูณ

  // คำนวณผลรวมจากการคูณ
  const sum = digits
    .slice(0, 12)
    .reduce((acc, digit, index) => acc + digit * weights[index], 0);

  // หาค่า Checksum และตรวจสอบกับหลักสุดท้าย
  const checkDigit = (11 - (sum % 11)) % 10;

  return checkDigit === digits[12]; // ตรวจสอบว่าเลขหลักที่ 13 ตรงกับค่า Checksum หรือไม่
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  // ตรวจสอบว่าผ่านวันเกิดในปีนี้หรือยัง
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--; // ถ้ายังไม่ถึงวันเกิดในปีนี้ ลดอายุลง 1
  }

  return age;
}
