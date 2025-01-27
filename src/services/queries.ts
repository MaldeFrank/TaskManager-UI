import { useQuery } from "@tanstack/react-query"
import { getAllTasks } from "./apiTasks";
import { getAllAssignTasks, getAllAssignTasksWeekly } from "./apiAssignedTasks";
import { getAllProfiles } from "./apiProfile";
import { getAssignedTasks } from "./apiTasklist";

export function useGetAllTasks() {
    return useQuery({
      queryKey: ["getAllTasks"],
      queryFn: getAllTasks,
    });
  }

  export function useGetAllAssignedTasks(){
  return useQuery({
    queryKey: ["getAllAssignTasks"],
    queryFn: getAllAssignTasks
  })
  }

  export function useGetAllAssignedTasksWeekly(){
    return useQuery({
      queryKey: ["getAllAssignTasks"],
      queryFn: getAllAssignTasksWeekly
    })
    }

  export function useGetAllProfiles(){
    return useQuery({
      queryKey: ["getAllProfiles"],
      queryFn: getAllProfiles
    })
    }
