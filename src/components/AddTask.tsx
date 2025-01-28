import { Dropdown, MenuProps } from "antd";
import { AssignedTaskDto } from "../model/AssignedTask";
import { Task } from "../model/Task";
import { postAssignTask } from "../services/apiAssignedTasks";

interface Props {
  tasklists: any[];
}

function AddTask({ tasklists}: Props) {

   const items: MenuProps["items"] = tasklists.map((tasklist,index) => ({
      key: index,
      label: tasklist.listName,
    }));



  return (
    <Dropdown.Button
    menu={{
      items,
    }}
    placement="bottom"
  >
    Add til delte lister
  </Dropdown.Button>
  );
}

export default AddTask;
