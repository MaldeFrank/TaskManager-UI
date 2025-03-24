import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";
import { setTasklist } from "../../redux/slicers/tasklistSlicer";

  {/* ---------------------------------------------------------------------
    Function: switchTaskState
    Purpose: Switches the state of the task from completed to not completed
    --------------------------------------------------------------------- */}
    export const switchTaskState = (record: any, dispatch:any, tasklistState:any) => {
      if (record.assignedTo) {

        const updatedTasklist = tasklistState.map((task:any) => { //Makes new reference, so useSelector detects change
            if (task.id === record.id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        })

        dispatch(setTasklist(updatedTasklist)) //Set the new state/new tasklist
  
          const updatedRecord = { ...record, completed: !record.completed }; 
  
          if (record.completed === true) {
              console.log("Tasklist", record);
              addPoints(record.assignedTo.id, record.task.points, record.task.title, record.tasklistId);
          }
  
          if (record.completed === false) {
              console.log("Tasklist", record.tasklist);
              deletePointScoreByName(record.task.title, record.tasklistId, record.assignedTo.id);
          }
  
          updateAssignTask(updatedRecord); 
  
      } else {
          message.warning("Opgave er ikke tildelt");
      }
  };