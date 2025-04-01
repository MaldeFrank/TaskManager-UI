import { GoogleAccount } from "./GoogleAccount";


export interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  googleAccount: GoogleAccount; 
}

