import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./asset/style.css";
import NavBar from "./components/navbar";
import userReducer from "./store/user";
import followReducer from "./store/follow";
import profileReducer from "./store/profile";

const store = configureStore({
  //collection of reducers
  reducer: {
    registrant: userReducer.registrantReducer,
    login: userReducer.loginReducer,
    followPage: followReducer.followsReducer,
    profile: profileReducer.profileReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
