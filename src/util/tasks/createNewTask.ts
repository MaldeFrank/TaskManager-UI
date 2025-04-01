import { Task } from "../../model/Task";
import { addTask, setTasklist } from "../../redux/slicers/taskSlicer";
import { postTask } from "../../services/apiTasks";

  {/* ---------------------------------------------------------------------
    Function: createNewTask
    Purpose: Create a new task in the database, and sets the state of tasks
    --------------------------------------------------------------------- */}
    export const createNewTask = async (dispatch: any, setEditingKey: any, form: any) => {
      const userId = localStorage.getItem("user_id");
    
      if (userId === null) {
        console.error("User not logged in");
        return;
      }
    
      const newTask: any = {
        title: "Edit",
        description: "Edit",
        points: 0,
        googleId: userId,
      };
    
      const createdTask = await postTask(userId, newTask);
      dispatch(addTask(createdTask))
    
      // Reset the form fields to the new task's default values
      form.setFieldsValue({
        title: createdTask.title, 
        description: createdTask.description, 
        points: createdTask.points, 
      });
    
      setEditingKey(createdTask.id);
    };