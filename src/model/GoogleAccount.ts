import { AssignedTask } from "./AssignedTask";
import { Profile } from "./Profile";
import { Task } from "./Task";
import { Tasklist } from "./Tasklist";

export interface GoogleAccount {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  profiles: Profile[] | undefined;
  tasklists: Tasklist[] | undefined;
  assignedTasks: AssignedTask[] | undefined;
  task: Task[] | undefined;
}