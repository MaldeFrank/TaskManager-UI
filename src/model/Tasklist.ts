import { AssignedTask } from "./AssignedTask";
import { GoogleAccount } from "./GoogleAccount";
import { PointScore } from "./PointScore";

export interface Tasklist {
  taskId: number | undefined;
  listName: string | undefined;
  periodFilter: string | undefined;
  pointScores: PointScore[] | undefined;
  googleAccount: GoogleAccount[] | undefined;
  assignedTaskList: AssignedTask[] | undefined;
}