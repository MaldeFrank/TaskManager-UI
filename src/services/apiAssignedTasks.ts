import axios from "axios";
import { Task, TaskDto } from "../model/Task";
import { AssignedTask, AssignedTaskDto, AssignedTaskUpdateDto } from "../model/AssignedTask";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postAssignTask = async (assignedTaskDto:any) => {
    const responseBody = {
        completed:assignedTaskDto.completed,
        task:assignedTaskDto.task,
        tasklist: { 
            taskId: assignedTaskDto.tasklistId 
        }, 
        googleAccount: {
            id: assignedTaskDto.googleId
        },
        userId: assignedTaskDto.userId
    }
    
    return await axiosInstance.post<any>("/assignedTask", responseBody, { headers: { "Content-Type": "application/json" } });
};

export const updateAssignTask = async (assignedTask:AssignedTask) => {
  
  const assignedTaskDto: AssignedTask = {
  id:assignedTask.id,
  assignedTo: assignedTask?.assignedTo,
  completed: assignedTask.completed,
  dateTime: assignedTask.dateTime,
  task: assignedTask.task
  }
  console.log("This is assignDto",assignedTaskDto)
  return await axiosInstance.put<AssignedTaskUpdateDto>(`/assignedTask/${assignedTaskDto.id}`, assignedTaskDto, { headers: { "Content-Type": "application/json" } });
};

export const getAllAssignTasks = async (): Promise<AssignedTask[]> => {
    const response = await axiosInstance.get<AssignedTask[]>("/assignedTask", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};

export const getAllAssignTasksWeekly = async (): Promise<AssignedTask[]> => {
    const userId = localStorage.getItem("user_id");
    const response = await axiosInstance.get<AssignedTask[]>(`/assignedTask/weekly/${userId}`, {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};