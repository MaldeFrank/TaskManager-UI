import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/Task";

interface initialState{
    list: Task[],
}

const initialState:initialState = {
    list:[]
}

const taskSlicer = createSlice(
{
 name:"taskSlicer",
 initialState, 
 reducers: {
 setTasklist(state, action:PayloadAction<Task[]>){
    state.list = action.payload;
 },
 addTask(state, action:PayloadAction<Task>){
    state.list.push(action.payload);
 },
 removeTask(state, action:PayloadAction<number>){
    state.list.filter((task)=>task.id!==action.payload)
 }
 }
}

)