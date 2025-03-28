import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";
import { addAssTask } from "../../redux/slicers/tasklistSlicer";
import { AssignedTask } from "../../model/AssignedTask";
import { addTask } from "../../redux/slicers/myTasksSlicer";

  {/* ---------------------------------------------------------------------
    Function: switchTaskState
    Purpose: Switches the state of the task from completed to not completed
    --------------------------------------------------------------------- */}
    export const switchTaskState = (record: AssignedTask, dispatch:any) => {
      if (record.assignedTo) {

        const updatedTask = { 
         ...record,
         completed: !record.completed
        }
        
        if(updatedTask.assignedTo.id===Number(localStorage.getItem("profile_id"))){
          dispatch(addTask(record))
        }

        dispatch(addAssTask({id: updatedTask.tasklist.taskId, task:updatedTask})) //Set the new state/new task
  
          const updatedRecord = { ...record, completed: !record.completed }; 
  
          if (record.completed === true) {
              console.log("Tasklist", record);
              addPoints(record.assignedTo.id, record.task.points, record.task.title, record.tasklist.taskId);
          }
  
          if (record.completed === false) {
              console.log("Tasklist", record.tasklist);
              deletePointScoreByName(record.task.title, record.tasklist.taskId, record.assignedTo.id);
          }
  
          updateAssignTask(updatedRecord); 
  
      } else {
          message.warning("Opgave er ikke tildelt");
      }
  };