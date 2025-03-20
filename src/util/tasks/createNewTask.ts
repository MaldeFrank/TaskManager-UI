import { Task } from "../../model/Task";
import { postTask } from "../../services/apiTasks";

  {/* ---------------------------------------------------------------------
    Function: createNewTask
    Purpose: Create a new task in the database, and sets the state of tasks
    --------------------------------------------------------------------- */}
  export const createNewTask = async (setTasks:any) => {
    const userId = localStorage.getItem("user_id");

    if(userId === null) {
      console.error("User not logged in");
      return;
    }

    const newTask: any = {
      title: "Edit",
      description: "Edit",
      points: 0,
      googleId: userId,
    };
  
    const createdTask = await postTask(userId,newTask);
    console.log("Created task", createdTask);
    setTasks((prev: Task[]) => {
      return [...prev, createdTask];
    });
  };