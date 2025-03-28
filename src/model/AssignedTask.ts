import { GoogleAccount } from "./GoogleAccount";
import { Profile } from "./Profile";
import { Task } from "./Task";
import { Tasklist } from "./Tasklist";


export interface AssignedTask {
  id: string;
  assignedTo: Profile | undefined;
  completed: boolean | undefined;
  dateTime: string | undefined;
  task: Task | undefined;
  userId: string | undefined;
  tasklist: Tasklist | undefined;
  googleAccount: GoogleAccount[] | undefined;
}

export interface UpdateAssignedTaskDTO {
  id: string;
  assignedTo: Profile | undefined;
  completed: boolean | undefined;
  dateTime: string | undefined;
  task: Task | undefined;
}

