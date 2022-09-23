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

const editingProfileInitialState = {
  profile_id: "",
  user_id: "",
  avatar: "",
  success: false,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
  errors: "",
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

export const editingProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    value: editingProfileInitialState,
  },
  reducers: {
    editProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const { editProfile } = editingProfileSlice.actions;

const reducers = {
  profileReducer: profileSlice.reducer,
  editProfileReducer: editingProfileSlice.reducer,
};
export default reducers;
