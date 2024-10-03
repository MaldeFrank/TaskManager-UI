import { Profile } from "../model/Profile";
import axios from "axios";
const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getAllProfiles = async (): Promise<Profile[]> => {
    const response = await axiosInstance.get<Profile[]>("/profiles", {
        headers: {"Content-Type": "application/json"}
    });
    return response.data;
};