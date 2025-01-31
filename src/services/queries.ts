import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "./apiTasks";
import { getAllAssignTasks, getAllAssignTasksWeekly } from "./apiAssignedTasks";
import { getAllProfiles } from "./apiProfile";
import { getAllTasklist, getAssignedTasks } from "./apiTasklist";
import { getAccAssignedTasks, getAllAccTasklist } from "./apiGoogleAccount";

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

export function useGetAllProfiles() {
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
