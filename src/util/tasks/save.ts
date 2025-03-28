import { Task } from "../../model/Task";
import { addTask } from "../../redux/slicers/taskSlicer";
import { putTask } from "../../services/apiTasks";



 {/* ---------------------------------------------------------------------
    Function: save
    Purpose: Saves the updated task to the database
    --------------------------------------------------------------------- */}
export const save = async (record: any, dispatch:any, setEditingKey:any, form:any) => {

  try {
    const updatedInfo = await form.validateFields(); //Gets the updated info from the form
    const updatedTask = { ...updatedInfo, id: record.id }; //Sets the id of the row
    putTask(updatedTask); //Saves the updated task to the database
    dispatch(addTask(updatedTask))
    setEditingKey(-1);
  } catch (errInfo) {
    console.log("Validate Failed:", errInfo);
  }
};
