import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";

  {/* ---------------------------------------------------------------------
    Function: switchTaskState
    Purpose: Switches the state of the task from completed to not completed
    --------------------------------------------------------------------- */}
  export const switchTaskState = (record: any, setAssignedTasks:any) => {
    
    if(record.assignedTo){
      setAssignedTasks((prev: any[]) =>
        prev.map((task) => {
          if (task.id === record.id) {
            task.completed = !task.completed;
            return task;
          } else {
            return task;
          }
        })
      );

      if(record.completed===true){
        console.log("Tasklist", record)
        addPoints(record.assignedTo.id, record.task.points, record.task.title, record.tasklistId)
      }

      if(record.completed===false){
        console.log("Tasklist", record.tasklist)
        deletePointScoreByName(record.task.title,record.tasklistId,record.assignedTo.id)
      }

      updateAssignTask(record);
    }else{
      message.warning("Opgave er ikke tildelt")
    }
  };