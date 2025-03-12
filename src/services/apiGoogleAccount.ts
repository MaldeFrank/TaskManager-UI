import { Profile } from "../model/Profile";
import axios from "axios";
const BASE_URL = "http://localhost:8080/googleAccount";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAllAccounts = async (): Promise<Profile[]> => {
  const response = await axiosInstance.get("/getAll", {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
};

export const getAccount = async (id: number) => {
  const response = await axiosInstance.get<any>(`/get/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const checkIfAccountExists = async (id: String) => {
    console.log("Checking if account exists", id);
    const response = await axiosInstance.get<any>(`/checkIfExists/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
  
    return response.data;
  };

export const createAccount = async (googleAcc: any) => {
    console.log("Creating Google Account", googleAcc);
  const data = {
    id: googleAcc.googleId,
    name: googleAcc.name,
    email: googleAcc.email,
  };

  const response = await axiosInstance.post("/create", data, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const deleteAccount = async (id: number) => {
  const response = await axiosInstance.delete<any>(`/delete/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const getAccAssignedTasks = async (id: any) => {
  const response = await axiosInstance.get<any>(`/getAssignedTasks/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const getAllAccTasklist = async (userId:any) => {
  const response = await axiosInstance.get(`/tasklists/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
};

export const getAllAccTasks = async (userId:any) => {
  const response = await axiosInstance.get(`/getTasks/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
};

export const getAllAccProfiles = async (userId:any) => {
  const response = await axiosInstance.get(`/getAllProfile/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Responses", response.data);
  return response.data;
}
