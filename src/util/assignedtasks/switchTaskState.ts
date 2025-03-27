import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";
import { addAssTask } from "../../redux/slicers/tasklistSlicer";

  {/* ---------------------------------------------------------------------
    Function: switchTaskState
    Purpose: Switches the state of the task from completed to not completed
    --------------------------------------------------------------------- */}
    export const switchTaskState = (record: any, dispatch:any) => {
      if (record.assignedTo) {

        const updatedTask = { //Change completed
         ...record,
         completed: !record.completed
        }
        
        console.log("updatedTask: ", updatedTask)
        dispatch(addAssTask({id: updatedTask.tasklistId, task:updatedTask})) //Set the new state/new task
  
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