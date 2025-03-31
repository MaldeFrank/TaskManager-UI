import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssignedTask } from '../../model/AssignedTask';

interface assignedTaskState {
  list: AssignedTask[];
}

const initialState: assignedTaskState = {
  list: [],
};

const myTasksSlice = createSlice({
  name: 'myTasksSlicer',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<AssignedTask>) { //Updates or adds the given AssignedTask
      const assignedTaskIndex = state.list.findIndex((item) => item.id === action.payload.id);
      if (assignedTaskIndex !== -1) {
        // Update existing task
        state.list[assignedTaskIndex] = {
          ...state.list[assignedTaskIndex],
          ...action.payload,
        };
      } else {
        // If task doesn't exist, add it
        state.list.push(action.payload);
      }
    },
    removeTask(state, action:PayloadAction<AssignedTask>){
     const assignedTaskIndex = state.list.findIndex((item) => item.id === action.payload.id);
     if(assignedTaskIndex!==-1){
      state.list.splice(assignedTaskIndex,1);
     }else{
      console.log("No no");
     }
    },
    setMyTasks(state, action: PayloadAction<AssignedTask[]>) {
      state.list = action.payload;
    },
    removeAssignedTasks(state, action:PayloadAction<string>){ //Removes all assignedTasks with given tasklist id
        state.list = state.list.filter((assignedTask) => assignedTask.tasklistId !== Number(action.payload));
    }
  },
});

export const { addTask: addTask, setMyTasks: setMyTasks,removeAssignedTasks,removeTask } = myTasksSlice.actions;

export default myTasksSlice.reducer;