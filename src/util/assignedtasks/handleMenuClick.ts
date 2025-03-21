import { message } from "antd";
import { AssignedTask } from "../../model/AssignedTask";
import { updateAssignTask } from "../../services/apiAssignedTasks";

 {/* ---------------------------------------------------------------------
    Function: handleMenuClick
    Purpose: Assigns an AssignedTask to a user
    --------------------------------------------------------------------- */}
export const handleMenuClick = (record: AssignedTask, setAssignedTasks:any, profiles:any[]) => (e: any) => {
    const selectedProfile = profiles.find(profile => profile.id === parseInt(e.key));
    if (selectedProfile) {
      setAssignedTasks((prev: AssignedTask[]) =>
        prev.map((task) =>
          task.id === record.id ? { ...task, assignedTo: selectedProfile } : task
        ),
        record.assignedTo=selectedProfile
      );
      message.info("User assigned successfully");
      updateAssignTask(record);
    }
  };