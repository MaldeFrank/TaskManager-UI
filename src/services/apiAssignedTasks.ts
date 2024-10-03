import axios from "axios";
import { Task, TaskDto } from "../model/Task";
import { AssignedTask, AssignedTaskDto } from "../model/AssignedTask";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postAssignTask = async (assignedTaskDto:AssignedTaskDto) => {
    const responseBody = {
        completed:assignedTaskDto.completed,
        task:assignedTaskDto.task
    }
    
    return await axiosInstance.post<AssignedTask>("/assignedTask", responseBody, { headers: { "Content-Type": "application/json" } });
};

export const updateAssignTask = async (assignedTask:AssignedTask) => {
  
  
  return await axiosInstance.put<AssignedTask>(`/assignedTask/${assignedTask.id}`, assignedTask, { headers: { "Content-Type": "application/json" } });
};

export const getAllAssignTasks = async (): Promise<AssignedTask[]> => {
    const response = await axiosInstance.get<AssignedTask[]>("/assignedTask", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};