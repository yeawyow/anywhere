import api from "./axiosInstance";

interface LoginResponse {

  
  
   
    token: string;
 
}

export const loginApi = async (user_national_id: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("api/auth/login", { user_national_id, password });
  console.log(response.data); // ตรวจสอบ Response
  return response.data;
};
