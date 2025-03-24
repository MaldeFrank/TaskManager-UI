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
    addTask(state, action: PayloadAction<any>) {
      state.list.push(action.payload)
    },
    setTasklist(state, action: PayloadAction<any>){
    state.list = action.payload
    }
  }
})

export const { addTask: addTask, setTasklist: setTasklist } = myTasksSlice.actions

export default myTasksSlice.reducer