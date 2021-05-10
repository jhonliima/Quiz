import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignInAndSignUp from "./Pages/sign-in-sign-up/sign-in-sign-up.component";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <SignInAndSignUp />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
