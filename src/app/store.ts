import { configureStore } from '@reduxjs/toolkit'
import userlistReducer from "../redux/slicers/userlistSlicer"
import assignedReducer from "../redux/slicers/myTasksSlicer"
import tasklistReducer from "../redux/slicers/tasklistSlicer"
import taskReducer from "../redux/slicers/taskSlicer"

//Store that holds reducers for performing state management
const store = configureStore({
  reducer: {
    userlist: userlistReducer,
    myTaskList: assignedReducer,
    assignedTasklist: tasklistReducer,
    tasklist: taskReducer,
  }
})

export default store
export type AppDispatch = typeof store.dispatch; //Returning the stores dispatch function
export type RootState = ReturnType<typeof store.getState>; //Returns the state the store holds