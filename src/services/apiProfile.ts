import { Profile } from "../model/Profile";
import axios from "axios";
const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAllProfiles = async (): Promise<Profile[]> => {
    const response = await axiosInstance.get<Profile[]>("/profiles", {
        headers: {"Content-Type": "application/json"}
    });
    console.log("Responses",response.data)
    return response.data;
};

export const createProfile = async (profile:Profile): Promise<Profile[]> => {
    const data ={
    name:profile.name,
    points: profile.points
    }

    const response = await axiosInstance.post<Profile[]>("/profile",data, {
        headers: {"Content-Type": "application/json"}
    });
    
    return response.data;
};