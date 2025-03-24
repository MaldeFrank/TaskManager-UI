import { message } from "antd";
import { AssignedTask } from "../../model/AssignedTask";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { setTasklist } from "../../redux/slicers/tasklistSlicer";
{/* ---------------------------------------------------------------------
    Function: handleMenuClick
    Purpose: Assigns an AssignedTask to a user
    --------------------------------------------------------------------- */}
    export const handleMenuClick = (record: AssignedTask, profiles: any[], dispatch: any, tasklistState:any) => (e: any) => {
        const selectedProfile = profiles.find(profile => profile.id === parseInt(e.key));
        
        if (selectedProfile) {
            const updatedList = tasklistState.map((task:any) =>task.id === record.id ? { ...task, assignedTo: selectedProfile } : task) // To make another reference, so useSelector detects change
            dispatch(setTasklist(updatedList))
    
            message.info("User assigned successfully");
            updateAssignTask({ ...record, assignedTo: selectedProfile }); 
        }
    };