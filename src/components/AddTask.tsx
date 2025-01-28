import { Dropdown, MenuProps } from "antd";
import { AssignedTaskDto } from "../model/AssignedTask";
import { Task } from "../model/Task";
import { postAssignTask } from "../services/apiAssignedTasks";

interface Props {
  tasklists: any[];
  task: any;
}

function AddTask({ tasklists, task }: Props) {
  const items: MenuProps["items"] = tasklists.map((tasklist) => ({
    key: tasklist.taskId,
    label: tasklist.listName,
  }));

  const postAssignedTaskFunction = async (task: Task, clickedItem: number) => {
    console.log("clicked item", clickedItem);
    try {
      const assignedTaskDto = {
        assignedTo: 0, 
        completed: false,
        task: task, 
        tasklistId:clickedItem,
        userId: localStorage.getItem("user_id"),
      };
  
      const response = await postAssignTask(assignedTaskDto);
      // Handle successful assignment (e.g., show a success message)
    } catch (error) {
      console.error("Error assigning task:", error);
      // Show an error message to the user
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