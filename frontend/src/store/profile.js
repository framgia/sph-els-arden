import { createSlice } from "@reduxjs/toolkit";

const profileInitialState = {
  user_id: "",
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  total_lessons_learned: 0,
  total_words_learned: 0,
  follower: 0,
  following: 0,
  viewingOwn: false,
  errors: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    value: profileInitialState,
  },
  reducers: {
    setProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

const reducers = {
  profileReducer: profileSlice.reducer,
};
export default reducers;
