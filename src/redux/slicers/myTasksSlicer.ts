import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface assignedTaskState{
   list: any[],
}  

const initialState:assignedTaskState = {
  list: [],
}

{/* ---------------------------------------------------------------------
    Function: userSlice
    Purpose: To manage userlist state with the reducer functions
    --------------------------------------------------------------------- */}
const myTasksSlice = createSlice({
  name: 'myTasksSlicer',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{id:any, task:any}>) {
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
    setMyTasks(state, action: PayloadAction<any>){
    state.list = action.payload
    }
  }
})

export const { addTask: addTask, setMyTasks: setMyTasks } = myTasksSlice.actions

export default myTasksSlice.reducer