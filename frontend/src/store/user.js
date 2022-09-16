import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
  success: false,
  errors: {},
};

export const registrantSlice = createSlice({
  name: "registrant",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    register: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { register } = registrantSlice.actions;

export default registrantSlice.reducer;
