export class Task {
  id: number;
  title: string;
  description: string;
  points: number;
  assignedTo:string;

  constructor(id:number, title: string, description: string, points: number, assignedTo:string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.points = points;
    this.assignedTo = assignedTo;
  }
}