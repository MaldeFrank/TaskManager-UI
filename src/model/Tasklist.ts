import { AssignedTask } from "./AssignedTask";
import { GoogleAccount } from "./GoogleAccount";
import { PointScore } from "./PointScore";

export interface Tasklist {
  taskId: number;
  listName: string;
  periodFilter: string;
  pointScores: PointScore[];
  googleAccount: GoogleAccount[];
  assignedTaskList: AssignedTask[];
}