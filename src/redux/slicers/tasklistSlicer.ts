import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tasklist{
    list: any[];
}

const initialState:tasklist = {
    list:[],
}

const tasklistSlice = createSlice({
    name: 'tasklistSlicer',
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

export const {addTask:addAssTask,setTasklist:setTasklist} = tasklistSlice.actions;
export default tasklistSlice.reducer;