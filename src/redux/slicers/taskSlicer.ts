import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/Task";

interface initialState {
  list: Task[];
}

const initialState: initialState = {
  list: [],
};

const taskSlicer = createSlice({
  name: "taskSlicer",
  initialState,
  reducers: {
    setTasklist(state, action: PayloadAction<Task[]>) {
      state.list = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      const foundTaskIndex = state.list.findIndex((task) => task.id === action.payload.id);
      
      //If task does not exist create it, else update it.
      if (foundTaskIndex === -1) { 
        state.list.push(action.payload);
      } else {
        state.list[foundTaskIndex] = action.payload;
      }
    },
    removeTask(state, action: PayloadAction<number>) {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
  },
});

export const {setTasklist,addTask,removeTask} = taskSlicer.actions;
export default taskSlicer.reducer;
