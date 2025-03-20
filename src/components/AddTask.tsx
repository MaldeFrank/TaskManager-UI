import { Dropdown, MenuProps } from "antd";
import { Task } from "../model/Task";
import { postAssignTask } from "../services/apiAssignedTasks";

interface Props {
  tasklists: any[];
  task: any;
  setAssignedTasks: any;
}
{/* ---------------------------------------------------------------------
    Component: AddTask
    Purpose: Is a button resposible for setting a task to a tasklist, making the task an assignedtask.
    --------------------------------------------------------------------- */}
function AddTask({ tasklists, task, setAssignedTasks }: Props) {
  const items: MenuProps["items"] = tasklists.map((tasklist) => ({
    key: tasklist.taskId,
    label: tasklist.listName,
  }));

  const postAssignedTaskFunction = async (task: Task, clickedItem: number) => {
    try {
      const assignedTaskDto = {
        assignedTo: 0, 
        completed: false,
        task: task, 
        tasklistId:clickedItem,
        userId: localStorage.getItem("user_id"),
      };
  
      const response = await postAssignTask(assignedTaskDto);
      setAssignedTasks([]);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <Dropdown.Button
      menu={{
        items,
        onClick: (e) => postAssignedTaskFunction(task, Number(e.key)),
      }}
      placement="bottom"
    >
      Add til delte lister
    </Dropdown.Button>
  );
}

export default AddTask;