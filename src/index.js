import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseProvider } from "./store/FirebaseContext";
import Context from "./store/FirebaseContext";
import firebase from './firebase/config'

ReactDOM.render(
  <FirebaseProvider>
    <Context>
        <App />
    </Context>
  </FirebaseProvider>,
  document.getElementById("root")
);
