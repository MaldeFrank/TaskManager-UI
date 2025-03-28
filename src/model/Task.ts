import { GoogleAccount } from "./GoogleAccount";


export interface Task {
  id: number;
  title: string | undefined;
  description: string | undefined;
  points: number | undefined;
  googleAccount: GoogleAccount | undefined; 
}

