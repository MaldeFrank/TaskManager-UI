import { useQuery } from "@tanstack/react-query"
import { getAllTasks } from "./apiTasks";
import { getAllAssignTasks } from "./apiAssignedTasks";

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