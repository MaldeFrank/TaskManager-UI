import { useMutation } from "@tanstack/react-query";
import { AssignedTask, AssignedTaskDto, Task } from "../model/Task";
import { deleteTask, postTask } from "./apiTasks";
import { postAssignTask } from "./apiAssignedTasks";

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

export function useCreateAssignTask(){
    return useMutation({
        mutationFn: (data: AssignedTaskDto) => postAssignTask(data)
    })
}