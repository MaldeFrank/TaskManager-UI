import { useQuery } from "@tanstack/react-query"
import { getAllAssignTasks, getAllTasks } from "./api";

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