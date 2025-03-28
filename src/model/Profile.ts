import { AssignedTask } from "./AssignedTask";
import { GoogleAccount } from "./GoogleAccount";
import { PointScore } from "./PointScore";

export interface Profile {
  id: number;
  name: string | undefined;
  points: number | undefined;
  pointScores: PointScore[] | undefined;
  googleAccounts: GoogleAccount[] | undefined;
  assignedTasks: AssignedTask[] | undefined;
}

export interface ProfileCreateDTO {
  id: number,
  name: string,
  points: number,
};
