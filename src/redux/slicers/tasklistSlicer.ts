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
        } else {
          // If tasklist doesn't exist, create new one with the task
          state.list.push({
            id: action.payload.id,
            tasklist: [action.payload.task]
          });
        }
      },
      setTasklist(state, action: PayloadAction<{id:any,tasklist:[]}>){
      state.list.push({
        id:action.payload.id,
        tasklist: action.payload.tasklist
      })
      }
    }
  })

export const {addTask:addAssTask,setTasklist:setTasklist} = tasklistSlice.actions;
export default tasklistSlice.reducer;