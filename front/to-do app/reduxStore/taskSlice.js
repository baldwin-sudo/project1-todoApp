// taskSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksArr: [],
  tasksLoading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
     console.log('set task action dispatched with payload :',action.payload)
      state.tasksArr = action.payload.tasksArr;
      state.tasksLoading = false;
    },
    setLoading: (state, action) => {
      state.tasksLoading = action.payload;
    },
    removeTask: (state, action) => {
        const taskId = action.payload.id;
        state.tasksArr = state.tasksArr.filter(task => task._id !== taskId);
      },
      pushTask:(state,action) =>{
        state.tasksArr.push(action.payload.task)
      },
      updateTask: (state, action) => {
        const updatedTask = action.payload.task;
        const taskId = updatedTask._id;
  
        // Find the index of the task with the matching ID
        const taskIndex = state.tasks.findIndex((task) => task._id === taskId);
  
        // Update the task in the array
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }
      },
    
  },
});

export const { setTasks, setLoading ,pushTask,updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;
