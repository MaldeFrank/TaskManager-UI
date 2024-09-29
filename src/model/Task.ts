
export interface AssignedTask{
id: number;
assignedTo: string;
completed:boolean;
dateTime:string;
task:Task;
}

export interface Task{
  id: number;
  title: string;
  description: string;
  points: number;
}

export interface TaskDto{
  title: string;
  description: string;
  points: number;
}