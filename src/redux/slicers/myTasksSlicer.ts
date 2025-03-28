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
      const assignedTaskIndex = state.list.findIndex((item) => Number(item.id) === action.payload.task.id);
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
    setMyTasks(state, action: PayloadAction<AssignedTask[]>) {
      state.list = action.payload;
    },
  },
});

export const { addTask: addTask, setMyTasks: setMyTasks } = myTasksSlice.actions;

export default myTasksSlice.reducer;