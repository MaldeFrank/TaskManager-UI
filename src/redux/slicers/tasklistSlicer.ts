import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface tasklistObject{
  id:any;
  tasklist:any[];
}

interface tasklist{
    list: tasklistObject[];
}

const initialState:tasklist = {
    list:[],
}

const tasklistSlice = createSlice({
    name: 'tasklistSlicer',
    initialState,
    reducers: {
      addTask(state, action: PayloadAction<{ id: any; task: any }>) {
        const taskListObject: any = state.list.find(
          (taskList) => taskList.id === action.payload.id
        );
      
        if (taskListObject) {
          taskListObject.tasks.push(action.payload.task);
        }
      },
      setTasklist(state, action: PayloadAction<{id:any,tasklist:[]}>){
      state.list.push({
        id:action.payload.id,
        tasklist: action.payload.tasklist
      })
      }
    }
  })

export const {addTask:addAssTask,setTasklist:setTasklist} = tasklistSlice.actions;
export default tasklistSlice.reducer;