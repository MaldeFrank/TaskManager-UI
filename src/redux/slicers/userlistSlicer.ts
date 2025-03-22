import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userlistState{
   list: any[],
}  

const initialState:userlistState = {
  list: [],
}

{/* ---------------------------------------------------------------------
    Function: userSlice
    Purpose: To manage userlist state with the reducer functions
    --------------------------------------------------------------------- */}
const userSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      state.list.push(action.payload)
    },
    setTasklistUsers(state, action: PayloadAction<any>){
    state.list = action.payload
    }
  }
})

export const { addUser, setTasklistUsers } = userSlice.actions

export default userSlice.reducer