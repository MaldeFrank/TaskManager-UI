import { Profile } from "./Profile";
import { Tasklist } from "./Tasklist";

export interface PointScore {
  pointId: number;
  profile: Profile;
  dateTime: string;
  points: number;
  taskName: string;
  tasklist: Tasklist;
}