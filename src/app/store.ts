import { configureStore } from '@reduxjs/toolkit'
import userlistReducer from "../redux/slicers/userlistSlicer"
import assignedReducer from "../redux/slicers/myTasksSlicer"

//Store that holds reducers for performing state management
const store = configureStore({
  reducer: {
    userlist: userlistReducer,
    assignedTaskList: assignedReducer,
  }
})

export default store
export type AppDispatch = typeof store.dispatch; //Returning the stores dispatch function
export type RootState = ReturnType<typeof store.getState>; //Returns the state the store holds