import { Task } from "../../model/Task";
import { putTask } from "../../services/apiTasks";



 {/* ---------------------------------------------------------------------
    Function: save
    Purpose: Saves the updated task to the database
    --------------------------------------------------------------------- */}
export const save = async (record: any, setTasks:any, setEditingKey:any, form:any) => {

  try {
    const updatedInfo = await form.validateFields(); //Gets the updated info from the form
    const updatedTask = { ...updatedInfo, id: record.id }; //Sets the id of the row
    putTask(updatedTask); //Saves the updated task to the database
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task) => (task.id === record.id ? updatedTask : task))
    );
    setEditingKey(-1);
  } catch (errInfo) {
    console.log("Validate Failed:", errInfo);
  }
};
