import { AssignedTask } from "./AssignedTask";
import { Profile } from "./Profile";
import { Task } from "./Task";
import { Tasklist } from "./Tasklist";

export interface GoogleAccount {
  id: string ;
  name: string;
  email: string;
  profiles: Profile[];
  tasklists: Tasklist[];
  assignedTasks: AssignedTask[];
  task: Task[];
}