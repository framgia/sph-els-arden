import { createSlice } from "@reduxjs/toolkit";

const registerInitialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
  success: false,
  errors: {},
};

const loginInitialState = {
  email: "",
  password: "",
  success: false,
  errors: {},
};

export const registrantSlice = createSlice({
  name: "registrant",
  initialState: {
    value: registerInitialState,
  },
  reducers: {
    register: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: loginInitialState,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { register } = registrantSlice.actions;
export const { login } = loginSlice.actions;

const reducers = {
  registrantReducer: registrantSlice.reducer,
  loginReducer: loginSlice.reducer,
};
export default reducers;
