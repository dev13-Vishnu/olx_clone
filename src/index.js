import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseProvider } from "./store/Context";
import Context from "./store/Context";
import firebase from './firebase/config'

ReactDOM.render(
  <FirebaseProvider>
    <Context>
        <App /> 
    </Context>
  </FirebaseProvider>,
  document.getElementById("root")
);
