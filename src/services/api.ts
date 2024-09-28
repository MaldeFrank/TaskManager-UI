import axios from "axios";
import { AssignedTask, Task } from "../model/Task";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postTask = async (taskData: Task) => {
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

export const postAssignTask = async (assignedTask:AssignedTask) => {
    const responseBody = {
        assignedTo: assignedTask.assignedTo,
        completed:assignedTask.completed,
        dateTime:assignedTask.dateTime,
        task:assignedTask.task
    }
    
    return await axiosInstance.post<AssignedTask>("/assignedTask", responseBody, { headers: { "Content-Type": "application/json" } });
};

export const getAllAssignTasks = async (): Promise<AssignedTask[]> => {
    const response = await axiosInstance.get<AssignedTask[]>("/assignedTask", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};
