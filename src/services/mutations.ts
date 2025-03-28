import { useMutation } from "@tanstack/react-query";
import { TaskDto1 } from "../model/Task";
import { deleteTask, postTask, putTask } from "./apiTasks";
import { postAssignTask } from "./apiAssignedTasks";
import { AssignedTaskDto } from "../model/AssignedTask";
import { createProfile } from "./apiProfile";
import { ProfileDto1 } from "../model/Profile";



export function usePutTask(){
    return useMutation({
        mutationFn: (data: TaskDto1) => putTask(data)
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

export function useCreateProfile(){
    return useMutation({
        mutationFn: (data:ProfileDto1)=> createProfile(data)
    })
}
