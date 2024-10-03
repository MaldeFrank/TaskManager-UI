import { useQuery } from "@tanstack/react-query"
import { getAllTasks } from "./apiTasks";
import { getAllAssignTasks } from "./apiAssignedTasks";
import { getAllProfiles } from "./apiProfile";

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

  export function useGetAllProfiles(){
    return useQuery({
      queryKey: ["getAllProfiles"],
      queryFn: getAllProfiles
    })
    }