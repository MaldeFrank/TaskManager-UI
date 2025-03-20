import { message } from "antd";
import { updateAssignTask } from "../../services/apiAssignedTasks";
import { addPoints, deletePointScoreByName } from "../../services/apiPointScore";

 //Function to switch state to done and back
  export const switchTaskState = (record: any, setAssignedTasks:any, tasklistId:any) => {
    
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
        console.log("Tasklist id", tasklistId)
        addPoints(record.assignedTo.id, record.task.points, record.task.title, tasklistId)
      }

      if(record.completed===false){
        console.log("Tasklist id", tasklistId)
        deletePointScoreByName(record.task.title,tasklistId,record.assignedTo.id)
      }

      updateAssignTask(record);
    }else{
      message.warning("Opgave er ikke tildelt")
    }
  };