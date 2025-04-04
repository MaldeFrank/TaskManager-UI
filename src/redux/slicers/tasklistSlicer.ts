import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssignedTask } from "../../model/AssignedTask";
interface tasklistObject{
  id:number;
  tasklist:AssignedTask[];
}

interface tasklist{
    list: tasklistObject[];
}

const initialState:tasklist = {
    list:[],
}

const tasklistSlice = createSlice({
    name: 'tasklistSlicer',
    initialState,
    reducers: {
      addTask(state, action: PayloadAction<AssignedTask>) {
        const tasklistIndex = state.list.findIndex(tasklist => tasklist.id === action.payload.tasklistId); //Finds the tasklist
        
        if (tasklistIndex !== -1) {
          const AssignedTaskIndex = state.list[tasklistIndex].tasklist.findIndex( //Finds the index of the AssignedTask
            t => t.id === action.payload.id
          );
          console.log("AssignedTask_index: ",AssignedTaskIndex);
          if (AssignedTaskIndex !== -1) {
            // Update existing task
            state.list[tasklistIndex].tasklist[AssignedTaskIndex] = {
              ...state.list[tasklistIndex].tasklist[AssignedTaskIndex],
              ...action.payload
            };
          } else {
            // If task doesn't exist, add it
            state.list[tasklistIndex].tasklist.push(action.payload);
          }
      }
    },
      setTasklist(state, action: PayloadAction<{id:any,tasklist:[]}>){
        if (!state.list.find((tasklist) => tasklist.id === action.payload.id)) { 
          state.list = [...state.list, {
            id: action.payload.id,
            tasklist: action.payload.tasklist
          }];
        }

      },
      removeTasklist(state, action: PayloadAction<{ id: number }>) {
        const tasklistIndex = state.list.findIndex(item => item.id === action.payload.id);
        if (tasklistIndex !== -1) { // Check if the item was found
          state.list.splice(tasklistIndex, 1);
        }
      }
    }
  })

export const {addTask:addAssTask,setTasklist:setTasklist, removeTasklist:removeTasklist} = tasklistSlice.actions;
export default tasklistSlice.reducer;