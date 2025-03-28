import { TaskDto1 } from "../model/Task";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'text' | 'number';
    record: TaskDto1;
    index: number;
    children: React.ReactNode;
  }
