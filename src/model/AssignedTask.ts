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
  assignedTo: Profile;
  completed: boolean;
  task: Task;
}
