import { createSlice } from "@reduxjs/toolkit";

const followsPageInitialState = {
  followers: {},
  followings: {},
  currentTab: "followers",
};

export const followPageSlice = createSlice({
  name: "followsPage",
  initialState: {
    value: followsPageInitialState,
  },
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = followPageSlice.actions;

const reducers = {
  followsReducer: followPageSlice.reducer,
};
export default reducers;
