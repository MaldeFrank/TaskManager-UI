import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface tasklistObject{
  id:any;
  tasklist:any[];
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
      addTask(state, action: PayloadAction<{ id: any; task: any }>) {
        const tasklistIndex = state.list.findIndex(item => item.id === action.payload.id);
        
        if (tasklistIndex !== -1) {
          // Find the task within the tasklist
          const taskIndex = state.list[tasklistIndex].tasklist.findIndex(
            t => t.id === action.payload.task.id
          );
          
          if (taskIndex !== -1) {
            // Update existing task
            state.list[tasklistIndex].tasklist[taskIndex] = {
              ...state.list[tasklistIndex].tasklist[taskIndex],
              ...action.payload.task
            };
          } else {
            // If task doesn't exist, add it
            state.list[tasklistIndex].tasklist.push(action.payload.task);
          }
      }
    },
      setTasklist(state, action: PayloadAction<{id:any,tasklist:[]}>){
        if (!state.list.find((tasklist) => tasklist.id === action.payload.id)) { // More common way to check
          state.list = [...state.list, {
            id: action.payload.id,
            tasklist: action.payload.tasklist
          }];
        }

      },
      removeTasklist(state, action: PayloadAction<{ id: number }>) {
        const tasklistIndex = state.list.findIndex(item => item.id === action.payload.id);
        console.log("This is the id: ", action.payload.id)
        if (tasklistIndex !== -1) { // Check if the item was found
          state.list.splice(tasklistIndex, 1);
        }
      }
    }
  })

export const {addTask:addAssTask,setTasklist:setTasklist, removeTasklist:removeTasklist} = tasklistSlice.actions;
export default tasklistSlice.reducer;