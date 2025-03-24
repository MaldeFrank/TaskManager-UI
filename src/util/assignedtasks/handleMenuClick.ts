import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addAssTask } from "../../redux/slicers/tasklistSlicer";

export const handleMenuClick = (record: any, profiles: any[], dispatch: any, tasklistId: any) => (e: any) => {
  const selectedProfile = profiles.find(profile => profile.id === parseInt(e.key));
  
  if (selectedProfile) {
    // Create updated task object with assignedTo
    const updatedTask = { 
      ...record, 
      assignedTo: selectedProfile 
    };
    
    // Dispatch the updated task
    dispatch(addAssTask({
      id: tasklistId,
      task: updatedTask
    }));
    
    // Update task in backend
    updateAssignTask(updatedTask)
      .then(() => {
        message.success("User assigned successfully");
      })
      .catch((error) => {
        message.error("Failed to assign user");
        console.error(error);
      });
  }
};