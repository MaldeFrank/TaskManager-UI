import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "./apiTasks";
import { getAllAssignTasks, getAllAssignTasksWeekly, getAssignedTasksByProfileId } from "./apiAssignedTasks";
import { getAllProfiles } from "./apiProfile";
import { getAllTasklist, getAssignedTasks } from "./apiTasklist";
import { getAccAssignedTasks, getAllAccProfiles, getAllAccTasklist, getAllAccTasks } from "./apiGoogleAccount";

export function useGetAllTasks() {
  return useQuery({
    queryKey: ["getAllTasks"],
    queryFn: getAllTasks,
  });
}

export function useGetAllAssignedTasks() {
  return useQuery({
    queryKey: ["getAllAssignTasks"],
    queryFn: getAllAssignTasks,
  });
}

export function useGetAllAssignedTasksWeekly() {
  return useQuery({
    queryKey: ["getAllAssignTasks"],
    queryFn: getAllAssignTasksWeekly,
  });
}

export function useGetAllProfiles() { //No longer used
  return useQuery({
    queryKey: ["getAllProfiles"],
    queryFn: getAllProfiles,
  });
}

export function useGetAssingedTasks(id: number) {
  return useQuery({
    queryKey: ['getAssignedTasks', id], 
    queryFn: () => getAssignedTasks(id), 
  });
}

//Replaced with useGetAllAccTasklist
export function useGetAllTasklist() {
  return useQuery({
    queryKey: ["getAllTasklist"], 
    queryFn: getAllTasklist, 
  });
}

export function useGetAccAssignedTasks(id:any) {
  return useQuery({
    queryKey: ["getAllAssignTasks",id], 
    queryFn: ()=>getAccAssignedTasks(id), 
  });
}

export function useGetAllAccTasklist(userId:any) {
  return useQuery({
    queryKey: ["getAllAccTasklist",userId], 
    queryFn:()=> getAllAccTasklist(userId), 
  });
}

export function useGetAllAccTasks(userId:any) {
  return useQuery({
    queryKey: ["getAllAccTasks",userId], 
    queryFn:()=> getAllAccTasks(userId), 
  });
}

export function useGetAllAccProfiles(userId:any) {
  return useQuery({
    queryKey: ["getAllAccProfiles",userId], 
    queryFn:()=> getAllAccProfiles(userId), 
  });
}

export function useGetAssignedTasksByProfileId(profileId: any) {
  return useQuery({
    queryKey: ["getAssignedTasksByProfileId", profileId], // Include profileId in the query key
    queryFn: () => getAssignedTasksByProfileId(profileId),
  });
}
