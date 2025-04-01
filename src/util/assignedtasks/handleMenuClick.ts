import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addAssTask } from "../../redux/slicers/tasklistSlicer";
import { addTask, removeTask } from "../../redux/slicers/myTasksSlicer";

export const handleMenuClick = (record: any, profiles: any[], dispatch: any) => (e: any) => {
  const selectedProfile = profiles.find(profile => profile.id === parseInt(e.key));
  const sessionProfile = Number(localStorage.getItem("profile_id")); //The logged in users own profile
  const currentProfile = record?.assignedTo?.id;

  if (selectedProfile) {
    // Create updated AssignedTask with assignedTo
    const updatedTask = { 
      ...record, 
      assignedTo: selectedProfile 
    };
    
    if(updatedTask.assignedTo.id===sessionProfile){ //If profile is users own set to their personal task list
    dispatch(addTask(updatedTask));
    }

    if (currentProfile !== undefined && currentProfile !== null && currentProfile === sessionProfile && updatedTask.assignedTo.id !== sessionProfile) {
      dispatch(removeTask(record));
    }
     
    // Dispatch the updated task
    dispatch(addAssTask(updatedTask));
    
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