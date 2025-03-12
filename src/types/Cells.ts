import { Task } from "../model/Task";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'text' | 'number';
    record: Task;
    index: number;
    children: React.ReactNode;
  }
