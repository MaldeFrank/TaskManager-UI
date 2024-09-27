import { useQuery } from "@tanstack/react-query"
import { getAll } from "./api";

export function useGetAllTasks() {
    return useQuery({
      queryKey: ["getAllTasks"],
      queryFn: getAll,
    });
  }