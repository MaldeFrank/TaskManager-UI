import { Profile } from "./Profile";
import { Task } from "./Task";

export interface AssignedTask {
  id: number;
  assignedTo: Profile;
  completed: boolean;
  dateTime: string;
  task: Task;
}

export interface AssignedTaskDto {
  assignedTo: number;
  completed: boolean;
  task: Task;
  userId:any;
}

export interface AssignedTaskUpdateDto {
  id: number;
  assignedTo: number;
  completed: boolean;
  dateTime: string;
  task: Task;
}
