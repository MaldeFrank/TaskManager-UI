import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAssignedTasks = async (id:number): Promise<any> => {
    const response = await axiosInstance.get(`tasklist/assignedTasks/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Responses", response.data);
      return response.data;
};

export const getTasklist = async (id: number) => {
  const response = await axiosInstance.get(`tasklist/getTasklist/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
};

export const getAllTasklist = async () => {
  const response = await axiosInstance.get(`tasklist/getAll`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
};

export const deleteTasklist = async (id: number) => {
  const response = await axiosInstance.delete(`tasklist/deleteTasklist/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const createTasklist = async (tasklist: any) => {
  const data = {
    listName: tasklist.listName,  // Matches Java property name
  };
  
  const response = await axiosInstance.post(`tasklist/createTasklist`, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
