import { useMutation } from "@tanstack/react-query";
import { Task } from "../model/Task";
import { deleteTask, postTask } from "./api";

export function useCreateTask(){
    return useMutation({
        mutationFn: (data: Task) => postTask(data)
    })
}

export function useDeleteTask(){
    return useMutation({
        mutationFn: (id: number) => deleteTask(id)
    })
}