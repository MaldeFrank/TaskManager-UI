import { useMutation } from "@tanstack/react-query";
import { Task } from "../model/Task";
import { postTask } from "./api";

export function useCreateTask(){
    return useMutation({
        mutationFn: (data: Task) => postTask(data)
    })
}