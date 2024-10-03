import { Profile } from "./Profile";

export interface AssignedTask{
id: number;
assignedTo: Profile;
completed:boolean;
dateTime:string;
task:Task;
}

export interface Task{
  id: number;
  title: string;
  description: string;
  points: number;
}

export interface TaskDto{
  title: string;
  description: string;
  points: number;
}

export interface AssignedTaskDto{
  assignedTo: Profile;
  completed:boolean;
  task:Task;
  }