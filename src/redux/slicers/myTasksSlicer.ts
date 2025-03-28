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
    addTask(state, action: PayloadAction<{ id: any; task: AssignedTask }>) {
      const tasklistIndex = state.list.findIndex((item) => item.id === action.payload.id);
      if (tasklistIndex !== -1) {
        // Update existing task
        state.list[tasklistIndex] = {
          ...state.list[tasklistIndex],
          ...action.payload.task,
        };
      } else {
        // If task doesn't exist, add it
        state.list.push(action.payload.task);
      }
    },
    setMyTasks(state, action: PayloadAction<AssignedTask[]>) {
      state.list = action.payload;
    },
  },
});

export const { addTask: addTask, setMyTasks: setMyTasks } = myTasksSlice.actions;

export default myTasksSlice.reducer;