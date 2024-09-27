export class Task {
  title: string;
  description: string;
  points: number;

  constructor(title: string, description: string, points: number) {
    this.title = title;
    this.description = description;
    this.points = points;
  }
}