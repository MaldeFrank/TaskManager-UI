import axios from "axios";
import { Task } from "../model/Task";
import { BASE_URL } from "./baseURL";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postTask = async (googleId:any, taskData:any) => { 
  console.log('Google id received', googleId);
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
  
  return await axiosInstance.put<Task>(`/tasks/${taskData.id}`, responseBody, { headers: { "Content-Type": "application/json" } });
};

export const getAllTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get<Task[]>("/tasks", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};


export const deleteTask = async (id: number) => {
    try {
      const response = await axiosInstance.delete<Task>(`/tasks/${id}`, {
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
