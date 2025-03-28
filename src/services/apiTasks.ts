import axios from "axios";
import { TaskDto1 } from "../model/Task";
import { BASE_URL } from "./baseURL";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postTask = async (googleId:any, taskData:any) => { 
  const data = {
    title: taskData?.title,
    description: taskData?.description,
    points: taskData?.points,
    googleAccount: {
      id: googleId, 
    },
  };

  const response = await axiosInstance.post<any>("/tasks", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const putTask = async (taskData: any) => {
  const responseBody = {
      title: taskData?.title,
      description: taskData?.description,
      points: taskData?.points,
  }
  
  return await axiosInstance.put<TaskDto1>(`/tasks/${taskData.id}`, responseBody, { headers: { "Content-Type": "application/json" } });
};

export const getAllTasks = async (): Promise<TaskDto1[]> => {
    const response = await axiosInstance.get<TaskDto1[]>("/tasks", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};


export const deleteTask = async (id: number) => {
    try {
      const response = await axiosInstance.delete<TaskDto1>(`/tasks/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200 || response.status === 204) {
        console.log('Task deleted successfully');
      } else {
        console.error('Deletion failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
