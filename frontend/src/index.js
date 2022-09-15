import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";

import "./asset/style.css";
import registrantReducer from "./store/user";

const store = configureStore({
  //collection of reducers
  reducer: {
    registrant: registrantReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar />
      <App />
    </Provider>
  </React.StrictMode>
);
