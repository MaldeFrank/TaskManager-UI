import { Profile } from "./Profile";
import { Tasklist } from "./Tasklist";

export interface PointScore {
  pointId: number | undefined;
  profile: Profile | undefined;
  dateTime: string | undefined;
  points: number | undefined;
  taskName: string | undefined;
  tasklist: Tasklist | undefined;
}