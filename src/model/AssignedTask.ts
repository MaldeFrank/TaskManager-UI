import { GoogleAccount } from "./GoogleAccount";
import { Profile } from "./Profile";
import { Task } from "./Task";
import { Tasklist } from "./Tasklist";



export interface AssignedTask {
  id: string;
  assignedTo: Profile;
  completed: boolean;
  dateTime: string;
  task: Task;
  userId: string;
  tasklistId: number;
  tasklist: Tasklist;
  googleAccount: GoogleAccount[];
}

export interface UpdateAssignedTaskDTO {
  id: string;
  assignedTo: Profile;
  completed: boolean;
  dateTime: string;
  task: Task;
}

