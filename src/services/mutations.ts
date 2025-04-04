import { useMutation } from "@tanstack/react-query";
import { Task } from "../model/Task";
import { deleteTask, postTask, putTask } from "./apiTasks";
import { postAssignTask } from "./apiAssignedTasks";
import { AssignedTask } from "../model/AssignedTask";
import { createProfile } from "./apiProfile";
import { Profile } from "../model/Profile";



export function usePutTask(){
    return useMutation({
        mutationFn: (data: Task) => putTask(data)
    })
}

export function useDeleteTask(){
    return useMutation({
        mutationFn: (id: number) => deleteTask(id)
    })
}

export function useCreateAssignTask(){
    return useMutation({
        mutationFn: (data: AssignedTask) => postAssignTask(data)
    })
}

export function useCreateProfile(){
    return useMutation({
        mutationFn: (data:Profile)=> createProfile(data)
    })
}
