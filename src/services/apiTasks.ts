import axios from "axios";
import { Task, TaskDto } from "../model/Task";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postTask = async (taskData: TaskDto) => {
    const responseBody = {
        title: taskData.title,
        description: taskData.description,
        points: taskData.points,
    }
    
    return await axiosInstance.post<Task>("/tasks", responseBody, { headers: { "Content-Type": "application/json" } });
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
