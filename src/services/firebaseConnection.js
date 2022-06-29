import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_WpBEB7q0umAsgTFyc3tmcE7sP4Lpf7w",
  authDomain: "inf012-prova.firebaseapp.com",
  projectId: "inf012-prova",
  storageBucket: "inf012-prova.appspot.com",
  messagingSenderId: "675891598880",
  appId: "1:675891598880:web:9c82e557753b64b8d84e45",
};

const app = initializeApp(firebaseConfig);
var auth = null;
if (app) {
  auth = getAuth();
}

export default auth;
