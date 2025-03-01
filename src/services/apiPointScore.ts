import axios from "axios";
const BASE_URL = "http://localhost:8080/pointScore";
const axiosInstance = axios.create({ baseURL: BASE_URL });

const getProfileTasklistPoints = async (profileId: number, taskId: number) => {
  const response = await axiosInstance.get<any>(`pointScore/totalPointsByProfileId/${profileId}/${taskId}`,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const getProfilePoints = async (profileId: number) => {
  const response = await axiosInstance.get<any>(`pointScore/totalPointsByProfileId/${profileId}`,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const addPoints = async (pointScore:any) => {
  const response = await axiosInstance.post<any>(`pointScore/add`, pointScore,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}
