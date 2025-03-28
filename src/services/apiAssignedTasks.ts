import axios from "axios";
import { AssignedTask, UpdateAssignedTaskDTO} from "../model/AssignedTask";
import { BASE_URL } from "./baseURL";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const postAssignTask = async (assignedTaskDto: any) => {
  const responseBody = {
    completed: assignedTaskDto.completed,
    task: assignedTaskDto.task,
    tasklist: {
      taskId: assignedTaskDto.tasklistId,
    },
    googleAccount: [{ id: localStorage.getItem("user_id") }],
    userId: assignedTaskDto.userId,
  };

  return await axiosInstance.post<any>("/assignedTask", responseBody, {
    headers: { "Content-Type": "application/json" },
  });
};

export const postAssignTaskNoTasklist = async (assignedTaskDto: any) => {
  const responseBody = {
    completed: assignedTaskDto.completed,
    task: assignedTaskDto.task,
    googleAccount: [{ id: localStorage.getItem("user_id") }],
    userId: assignedTaskDto.userId,
  };

  return await axiosInstance.post<any>("/assignedTask", responseBody, {
    headers: { "Content-Type": "application/json" },
  });
};

export const updateAssignTask = async (assignedTask: AssignedTask) => {
  const assignedTaskDto: UpdateAssignedTaskDTO = {
    id: assignedTask.id,
    assignedTo: assignedTask?.assignedTo,
    completed: assignedTask.completed,
    dateTime: assignedTask.dateTime,
    task: assignedTask.task,
  };
  return await axiosInstance.put<UpdateAssignedTaskDTO>(`/assignedTask/${assignedTaskDto.id}`,assignedTaskDto,
    { headers: { "Content-Type": "application/json" } }
  );
};

export const getAllAssignTasks = async (): Promise<AssignedTask[]> => {
  const response = await axiosInstance.get<AssignedTask[]>("/assignedTask", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getAssignedTasksByProfileId = async (id: any) => {
  try {
    const response = await axiosInstance.get<any[]>(
      `/assignedTasksByProfile/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
