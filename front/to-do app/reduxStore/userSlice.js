import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  id:""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action) => {
      state.email = action.payload.user.email;
      state.username = action.payload.user.username;
      state.id=action.payload.user._id
    },
  },
});
export const {set}=userSlice.actions
export default userSlice.reducer;
