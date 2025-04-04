import axios from "axios";
import { BASE_URL } from "./baseURL";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAssignedTasks = async (id: number): Promise<any> => {
  const response = await axiosInstance.get(`tasklist/assignedTasks/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("This is the assignedTasks fetched",response.data)
  return response.data;
};

export const getTasklist = async (id: number) => {
  try{
    const response = await axiosInstance.get(`tasklist/getTasklist/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    
    return response.data;
  }catch (error){
    console.log("Tasklist could not be fetched")
  }
 
};

export const updateTaskListName = async (id:string, name:string) =>{
  console.log("Update tasklist with")
  const data = {
  listName: name,
  }

  try{
    const response = await axiosInstance.put(`tasklist/updateTasklist/${id}`,data,{
    headers: {"Content-Type": "application/json"}
    })
  }catch(error){
   console.log(error)
  }
}

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
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("User ID not found in localStorage");
  }

  const data = {
    listName: tasklist.listName,
    periodFilter:"All",
    googleAccount: [{ id: userId }],
  };

  try {
    const response = await axiosInstance.post(`tasklist/createTasklist`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating tasklist:", error);
    throw error;
  }
};

export const addAccToTasklist = async (email: any, tasklistId: any) => {
  if(email.length === 0|| email === undefined || email === null){
    console.log("Email is empty")
    return
  }
  try {
    const response = await axiosInstance.put(
      `tasklist/addUser/${email}/${tasklistId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getAssignedTaskWeekly = async (id: any) => {
  try {
  const response = await axiosInstance.get(`tasklist/assignedTasksWeekly/${id}`);
  return response.data;
} catch (error) {
  console.error("Error getting list weekly list", error);
  throw error;
};
};

export const getAssignedTaskMonthly = async (id: any) => {
  try {
  const response = await axiosInstance.get(`tasklist/assignedTasksMonthly/${id}`);
  return response.data;
} catch (error) {
  console.error("Error getting Monthly list", error);
  throw error;
};
};

export const setPeriodFilter = async (id: number, period: string) => {
  try {
    const response = await axiosInstance.put(
      `/tasklist/setPeriodFilter/${id}/${period}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error setting period filter", error);
    throw error;
  }
};

export const getTasklistUsers = async (id: number) => {
  try {
    const response = await axiosInstance.get(`tasklist/getAllUsers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting tasklist users", error);
  }
}
