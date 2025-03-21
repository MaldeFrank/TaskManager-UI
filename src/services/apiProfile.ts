import { Profile } from "../model/Profile";
import axios from "axios";
import { BASE_URL } from "./baseURL";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAllProfiles = async (): Promise<any[]> => {
  const response = await axiosInstance.get<any[]>("/profiles", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getProfileByName = async (name: any): Promise<any> => {
  const response = await axiosInstance.get<any>(`/profile/getByName/${name}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const createProfile = async (profile: Profile) => {
  const data = {
    name: profile.name,
    points: profile.points,
  };

  const response = await axiosInstance.post("/profile", data, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const createGoogleProfile = async (profile: any) => {
  

  const response = await axiosInstance.post("/profile", profile, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const deleteProfile = async (id: number) => {
  const response = await axiosInstance.delete<Profile>(`/profile/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const addGoogleAcc = async (id: any, googleId: any) => {
  const response = await axiosInstance.put(`/profile/addGoogleAcc/${id}/${googleId}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
}

export const addGoogleAccByEmail = async (profileId: any, googleAccEmail: any) => {
  if(!profileId || !googleAccEmail) return;
  try{
  const response = await axiosInstance.put(`/profile/addGoogleAccByEmail/${profileId}/${googleAccEmail}`, {
    headers: { "Content-Type": "application/json" }, 
  });

  return response.data;
}catch(error){
  console.log("Error adding google acc by email", error)
}
}

export const getProfileByGoogleEmail = async (email: string) => {
  if (!email) return;
  try {
    const response = await axiosInstance.get(`/getProfileByGoogleEmail/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile by email:", error);
  }
};

