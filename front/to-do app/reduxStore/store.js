import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./taskSlice";
// Create a local storage middleware
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  return result;
};

const getInitialState =() =>{
    const storedState=localStorage.getItem("reduxState");
    return storedState ?JSON.parse(storedState):undefined
}
// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks:tasksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState:getInitialState()
});

export default store;
