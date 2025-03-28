import { AssignedTask } from "./AssignedTask";
import { GoogleAccount } from "./GoogleAccount";
import { PointScore } from "./PointScore";


export interface Profile {
  id: number | undefined;
  name: string | undefined;
  points: number | undefined;
  pointScores: PointScore[] | undefined;
  googleAccounts: GoogleAccount[] | undefined;
  assignedTasks: AssignedTask[] | undefined;
}
