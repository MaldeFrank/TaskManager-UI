import axios from "axios";
const BASE_URL = "http://localhost:8080/pointScore";
const axiosInstance = axios.create({ baseURL: BASE_URL });

const getProfileTasklistPoints = async (profileId: number, taskId: number) => {
  const response = await axiosInstance.get<any>(`/totalPointsByProfileId/${profileId}/${taskId}`,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const getProfilePoints = async (profileId: number) => {
  const response = await axiosInstance.get<any>(`/totalPointsByProfileId/${profileId}`,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

export const addPoints = async (profileId:number, points:number, taskName:string,tasklistId:number) => {
  const data = {
    profile:{
      id: profileId
    },
    points: points,
    taskName: taskName,
    tasklist:{
      taskId: tasklistId
    },
  }

  const response = await axiosInstance.post<any>(`/addPoints`, data,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}

export const deletePointScoreByName = async (taskName:string, taskId:number, profileId:number) => {
  const response = await axiosInstance.delete<any>(`/deleteWithTaskName/${taskName}/${taskId}/${profileId}`,{
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}
