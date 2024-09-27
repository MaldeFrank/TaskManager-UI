import axios from "axios";
import { Task } from "../model/Task";

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

export const getAll = async (): Promise<Task[]> => {
    const response = await axiosInstance.get<Task[]>("/tasks", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};
